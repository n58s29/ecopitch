# NOVA — Pitch Intelligence

**Fabrique de l'Adoption Numérique (FAN) × SNCF × VivaTech 2026**

Outil de capture et d'analyse de pitchs en temps réel, propulsé par Claude (Anthropic). Conçu pour les événements d'innovation SNCF : chaque participant dispose de 90 secondes pour pitcher sa solution, l'IA vérifie en direct les 8 points essentiels d'un bon pitch et pré-remplit automatiquement la fiche de contact.

---

## Changelog

### v4 — Checklist manuelle cliquable + popup merci (2026-04-16)

- Les points de la checklist (screen 2) sont cliquables pour cocher/décocher manuellement les points non couverts par l'IA
- Le score /8 se met à jour dynamiquement au clic
- Bouton "Envoyer mon pitch" ouvre une popup modale de remerciement (centrée, animée) au lieu de naviguer vers un écran séparé
- L'envoi webhook reste en fire-and-forget si l'URL est configurée ; sinon aucune erreur

### v3 — Refonte UX : saisie libre + deux boutons d'action (2026-04-16)

- **Zone de texte centrale** toujours visible et éditable — le pitch peut être tapé ou dicté
- **Bouton "Dictée"** : démarre/arrête la transcription vocale (Web Speech API) ; le texte transcrit alimente directement la zone de saisie
- **Bouton "Analyser"** : déclenche l'analyse Claude sur le contenu de la zone de texte (texte tapé et/ou transcrit), remplace le déclenchement automatique en fin de timer
- Le timer s'affiche de manière compacte pendant la dictée et arrête l'enregistrement à 0, sans analyser automatiquement
- Compteur de mots en temps réel sous le textarea
- Le texte déjà saisi est préservé quand on démarre la dictée
- Suppression de la zone de transcription séparée et du bouton micro circulaire
- Design allégé : boutons arrondis, état "recording" sur le textarea (bordure verte), timer en bandeau compact

### v2 — Design system FAN + renommage NOVA (2026-04-16)

- Adoption complète du design system Fabrique de l'Adoption Numérique
- Renommage de l'outil en NOVA
- Mode sombre, palette cerulean / ambre / menthe / lavande
- Topbar fixe, checklist animée, overlay d'analyse

---

## Fonctionnement

NOVA est un **fichier HTML unique, zéro dépendance**, déployable sur n'importe quel hébergeur statique.

### Flux utilisateur

```
1. Saisie de la clé API Anthropic (ou pré-configurée via ?key=)
2. Appui sur le bouton micro → démarrage de l'enregistrement (90 s)
3. Transcription en direct (Web Speech API)
4. L'IA analyse le pitch en temps réel (toutes les 20 s)
5. La checklist se coche automatiquement au fil du discours
6. À la fin : analyse complète Claude → pré-remplissage du formulaire
7. Vérification et complétion des informations par le pitcheur
8. Saisie des coordonnées → envoi vers le webhook configuré
9. Écran de remerciement personnalisé avec le score /8
```

### Les 8 points essentiels vérifiés

| # | Point | Question |
|---|-------|----------|
| 1 | Problème | Quel problème résolvez-vous ? |
| 2 | Cible | Pour qui ? (client cible / utilisateur) |
| 3 | Solution | Quelle est votre solution ? |
| 4 | Technologie | Quelle technologie / innovation clé ? |
| 5 | Différenciant | Quel est votre avantage concurrentiel ? |
| 6 | Maturité | Quel stade de maturité ? |
| 7 | Lien SNCF | Quel lien avec le ferroviaire / SNCF ? |
| 8 | Modèle éco. | Quel est votre modèle économique ? |

---

## Configuration avant déploiement

Ouvrir `index.html` et modifier les constantes en haut du bloc `<script>` :

```js
// Endpoint de réception des données (webhook)
const SUBMIT_URL = 'https://your-endpoint.example.com/submit';

// Modèle Claude utilisé
const CLAUDE_MODEL = 'claude-sonnet-4-20250514';

// Durée maximale du pitch (secondes)
const PITCH_DURATION = 90;

// Intervalle d'analyse partielle (secondes) — 0 pour désactiver
const PARTIAL_INTERVAL = 20;
```

### Webhooks compatibles

- **Google Forms** : `https://docs.google.com/forms/d/e/XXXXX/formResponse`
- **Tally.so** : `https://tally.so/r/XXXXX`
- **Make** : `https://hook.eu1.make.com/XXXXX`
- **Power Automate** : `https://prod-xx.westeurope.logic.azure.com/workflows/XXXXX`
- **n8n** : `https://your-n8n.com/webhook/XXXXX`

---

## Clé API Anthropic — BYOK

NOVA utilise le pattern **BYOK (Bring Your Own Key)**. La clé n'est jamais persistée côté serveur.

### Priorité de résolution

1. **Paramètre URL** `?key=sk-ant-xxx` — retiré de l'URL après lecture (sécurité)
2. **SessionStorage** — survit à un rechargement, disparaît à la fermeture du navigateur
3. **Modal de saisie** — affiché si aucune clé n'est trouvée

### Pré-configuration pour l'animateur du stand

Générer le QR code depuis l'URL suivante pour éviter la saisie manuelle :

```
https://votre-domaine.com/nova?key=sk-ant-api03-VOTRE_CLE_ICI
```

---

## Structure du payload

Données envoyées au webhook à chaque soumission :

```json
{
  "timestamp": "2026-05-22T10:32:00.000Z",
  "source": "NOVA_VivaTech2026",
  "contact": {
    "nom": "Prénom Nom",
    "entreprise": "Ma Startup SAS",
    "email": "contact@startup.com",
    "telephone": "+33 6 00 00 00 00",
    "url": "https://startup.com"
  },
  "solution": {
    "nom": "RailSense",
    "domaine": "Maintenance prédictive",
    "technologie": "IA / ML",
    "maturite": "MVP"
  },
  "pitch": {
    "transcription": "Texte complet du pitch…",
    "resume": "Résumé en 2-3 phrases généré par l'IA…",
    "questions_couvertes": 7,
    "questions_total": 8,
    "checklist": {
      "probleme": true,
      "cible": true,
      "solution": true,
      "techno": true,
      "differenciant": true,
      "maturite": true,
      "lien_sncf": true,
      "modele_eco": false
    }
  }
}
```

---

## Déploiement

### GitHub Pages (configuration actuelle)

Le fichier `.github/workflows/deploy.yml` déploie automatiquement `index.html` sur GitHub Pages à chaque push sur `main`.

### Autres hébergeurs statiques

Copier `index.html` sur n'importe quel hébergeur statique (Netlify, Vercel, Azure Static Web Apps, un simple serveur web). Aucun build nécessaire.

---

## Compatibilité navigateurs

| Navigateur | Transcription vocale | Saisie manuelle |
|------------|---------------------|-----------------|
| Chrome / Edge | Oui (Web Speech API) | Oui (fallback) |
| Safari (iOS/macOS) | Oui | Oui (fallback) |
| Firefox | Non | Oui (fallback automatique) |
| Android Chrome | Oui | Oui (fallback) |

---

## Stack technique

- **Frontend** : Vanilla JS (ES6+), zéro dépendance
- **IA** : API Anthropic (Claude) — appels directs depuis le navigateur
- **Transcription** : Web Speech API (natif navigateur)
- **Design** : Charte graphique FAN (Fabrique de l'Adoption Numérique)
- **Déploiement** : GitHub Pages via GitHub Actions

---

## Fabrique de l'Adoption Numérique

NOVA est un outil produit par la **Fabrique de l'Adoption Numérique (FAN)**, entité de e.SNCF Solutions / Direction Numérique Groupe SNCF.
