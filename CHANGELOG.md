# Changelog — NOVA

Tous les changements notables de ce projet sont documentés ici.
Format basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/).

---

## [2.0.0] — 2026-04-16

### Renommage & refonte visuelle

- **Renommage** : l'outil s'appelle désormais **NOVA** (anciennement PitchExpress)
- **Titre d'onglet** : `NOVA — Pitch Intelligence`
- **Charte graphique** : refonte complète avec le design system FAN (Fabrique de l'Adoption Numérique)

### Design system FAN

- **Palette** : migration vers les variables CSS officielles FAN (`--primaire`, `--cerulean`, `--ambre`, `--menthe`, `--ocre`, `--sombre-fond`, etc.)
- **Mode sombre** : application du mode sombre FAN (`--sombre-fond: #00205b`, `--sombre-fond-moyen: #001440`, `--sombre-fond-profond: #000d2e`)
- **Typographie** : Avenir / Avenir Next, poids 300 / 400 / 500 uniquement (pas de 600+), hiérarchie renforcée
- **Boutons** : border-radius `0.375rem` (standard FAN), suppression des formes pill sur les boutons d'action
- **Cartes** : style `carte-sombre` FAN (`rgba(255,255,255,0.04)`, `border: 1px solid rgba(255,255,255,0.08)`, `border-radius: 14px`)
- **Champs de formulaire** : style FAN dark mode — fond transparent, soulignement uniquement, focus `border-bottom-color: var(--cerulean)`
- **Toast** : border-radius `0.375rem` (cohérence FAN)

### Composants ajoutés

- **Topbar fixe** : barre d'en-tête `NOVA` + eyebrow `Fabrique de l'Adoption Numérique` avec point vivant animé
- **Pied de page FAN** : filet tricolore (`cerulean → ambre → menthe`) + signature sur l'écran de remerciement

### Contenu & ton

- **Badge screen 1** : conservé `SNCF × VivaTech 2026` (contexte événement)
- **Boutons** : suppression des emojis dans les libellés d'action (`→` à la place de `🚀`)
- **Messages d'encouragement** : retrait des emojis dans les messages système (conformité FAN)
- **Source payload** : `PitchExpress_VivaTech2026` → `NOVA_VivaTech2026`
- **README** : réécriture complète pour documenter NOVA

---

## [1.1.0] — 2026-04-14

### Traduction & UX

- Traduction française complète de l'interface
- Enregistrement non auto-démarré (l'utilisateur déclenche manuellement)
- Correction de l'animation de transcription intermédiaire
- Amélioration du fallback textarea pour Firefox

---

## [1.0.0] — 2026-04-10

### Version initiale — PitchExpress

- Application HTML single-file, zéro dépendance
- Enregistrement vocal 90 secondes via Web Speech API (fr-FR)
- Analyse en temps réel par Claude (Anthropic) — checklist 8 points
- Analyse partielle toutes les 20 secondes pendant l'enregistrement
- Analyse complète à la fin du pitch
- Pré-remplissage automatique du formulaire depuis les données Claude
- Formulaire de contact avec validation inline
- Envoi webhook (`no-cors`) avec fallback presse-papier
- Pattern BYOK (clé API via `?key=`, sessionStorage ou modal)
- Écran de remerciement personnalisé avec score /8
- Design SNCF × VivaTech 2026 (mode sombre, palette navy/cerulean/amber)
- Déploiement GitHub Pages via GitHub Actions
