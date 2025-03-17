# ReactJsProgettoFinale

# DESCRIZIONE
ReactGames è una applicazione sviluppata con React, permette a tutti gli utenti di navigare, cercare giochi e visualizzarli in dettaglio, è dotata di filtri per genere e per piattaforma.
L'applicazione permette all'utente di autenticarsi, l'utente registrato può salvare i suoi giochi preferiti nella pagina dell'account e chattare in tempo reale con gli altri utenti registrati.
# API
ReactGames utilizza le API di RAWG per ottenere dati sui giochi e SUPABASE come BaaS (Backend as a Service) per l'auteticazione e per l'archiviazione del database.
# STILE
ReactGames è realizzata con CSS Module, Material-UI e PicoCSS.
# PAGINE
HOME PAGE - Visualizza una griglia di card con i giochi presenti con scroll verticale, permette di cercare i titoli mediante la Search Game, permette di filtrare i giochi tramite la sidebar con filtri per genere e piattaforma,
            permette di raggiungere la registrazione dell'utente e la login.
PAGINA DETTAGLIO - Visualizza informazioni sul gioco selezionato e permetta all'utente registrato di chattare in tempo reale con gli altri utenti e di aggiungere giochi alla lista dei preferiti.
PAGINA FILTRO PER GENERE - Visualizza una griglia di card di giochi filtrati per genere.
PAGINA FILTRO PER PIATTAFORMA - Visualizza una griglia di card di giochi filtrati per piattaforma.
PAGINA REGISTER - Permette all'utente di registrarsi.
PAGINA LOGIN - Permette all'utente già registrato di loggarsi.
PAGINA ACCOUNT - Visualizza le informazioni dell'utente e i giochi salvati tra i preferiti.
# USER INTERACTIONS
UTENTI NON AUTENTICATI:
Navigare tra tutti i giochi presenti nella piattaforma,
Cercare giochi per titolo,
Filtrare giochi per genere o piattaforma,
Visualizzare informazioni dettagliate su gioch specifici,
Registrarsi con email e password.
UTENTI AUTENTICATI:
Visualizzare e aggiornare le informazioni del proprio profilo,
Gestire una lista di giochi preferiti,
Chattare con altri utenti nella chat in tempo reale.
# CONTEXT 
SESSION CONTEXT - Gestisce lo stato di autenticazione dell'utente.
FAVORITE CONTEXT - Gestisce la lista dei giochi preferiti dell'utente.
# DEPLOYMENT


