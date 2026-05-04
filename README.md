## 🏗️ Architecture du Projet – Avocat Link

### 📌 Mapping du Thème

**Thème :** Plateforme de mise en relation entre clients et avocats.

L’application permet :
- aux clients de publier des demandes juridiques
- aux avocats de proposer des services et recevoir des rendez-vous
- de gérer des interactions (avis, paiements, rendez-vous)

---

### 🗂️ Mapping des Tables

- **Table A – profiles**  
  Contient les informations des utilisateurs (clients et avocats) :  
  nom, email, téléphone.

- **Table B – avocats_details**  
  Contient les informations spécifiques aux avocats :  
  spécialité, description, certifications, etc.

- **Table C – appointments**  
  Gère les rendez-vous entre clients et avocats.

- **Autres Tables :**
  - **reviews** → avis laissés par les clients  
  - **payments** → gestion des paiements

---

### 📁 Fichiers (Données non structurées)

Stockés dans **Supabase Storage** :
- certificats des avocats  
- documents juridiques uploadés par les clients  
- fichiers liés aux dossiers  

---

### 🧠 Analyse d’Architecture

#### 1. OPEX vs CAPEX

L’utilisation de **Vercel + Supabase** permet d’éviter les coûts initiaux élevés.

- **CAPEX (Capital Expenditure)** :
  - achat de serveurs
  - installation physique
  - maintenance matérielle

- **OPEX (Operational Expenditure)** :
  - paiement à l’usage
  - abonnement mensuel flexible

👉 Dans ce projet, nous utilisons uniquement **OPEX**, ce qui est plus adapté pour :
- un projet étudiant
- une startup
- un MVP

---

#### 2. Scalabilité

- **Vercel** déploie automatiquement l’application sur plusieurs serveurs.
- Il gère la montée en charge sans intervention humaine.

- **Supabase** adapte la base de données selon le nombre d’utilisateurs.

👉 Contrairement à un data center physique :
- pas de gestion de climatisation ❄️
- pas de serveurs physiques 🖥️
- pas de maintenance matérielle

👉 La scalabilité est **automatique et instantanée**.

---

#### 3. Données Structurées vs Non-Structurées

- **Données structurées :**
  - profiles
  - avocats_details
  - appointments
  - reviews
  - payments

👉 données organisées en tables (SQL)

- **Données non structurées :**
  - fichiers PDF
  - images
  - certificats
  - documents juridiques

👉 stockés dans Supabase Storage

---
