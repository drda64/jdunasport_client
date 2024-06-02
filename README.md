# Jdu na sport - sportovní event manager

## O projektu
Projekt je semestrální prací pro předmět KAJ - SIT CTU. Jedná se o aplikaci ve frameworku Vue. Vue jsem si celkem osvojil a úspešně aplikaci dělil na jednotlivé komponenty. Avšak nejdříve jsem si vyhotovil API ve Flasku, jež je dostupná na /jdunasport_api.

## Upozornění
Bohužel Github Pages dle mého neumožňují lepší routing. Čili v pořádku běži vše podle Vue routeru do té doby, než se stránka aktualizuje. Poté je nutné opět přejít na "/". Touto nedokonolastí zaniká možnost přední funkce sdílet odkaz eventu. Tímto sdílením se přihlašenému uživateli event zobrazí a on má možnost se do něj přidat, či nepřihlášenému uživateli zobrazí login stránku a poté ho ihned přesměruje na stránku sdíleného eventu, tak, aby se do něj mohl ihned přidat.

Z tohoto důvodu jsem si dovolil ukázku funkcionality v podobě videa na YouTube.

## Motivace
Každý týden se scházím se skupinkou lidí ke hře 3 na 3 v ledním hokeji a každým týdnem jsou v tom stejné zmatky. Cílém mého projektu tedy bylo vytvořit přehledný event maneger obsahující pouze základní funkce, které jsou nejvíce potřeba. Zejména tedy organizace náhradníků v případě odhlášení aktivních členů.

## API
Za uchovávání a práci s daty slouží mnou vytvořená API dostupná též na mém účtě. Jelikož hlavním cílem je vytvořit javascript aplikaci, API není úplně dokonalá. Myslím tím, že např. u vytvoření eventu se zde nevyskytuje žádná validace na straně serveru. U ostatních formulářů jsem ji udělal, jelikož např. při registraci to považuji za elementární krok.

## Funckionality projektu
### Vytvoření účtu
```http
  GET /register
```
Naprosto základní součástí většiny webů je registrace uživatelů. Ta je zde napojena na moji API. Omluvte, prosím, dizajn registračního a přihlašovacího formuláře, již nebyl moc čas.

### Přihlášení účtu
```http
  GET /login
```
Opět, zde není co vysvětlovat.

### Dashboard
```http
  GET /
```
Nejdůležitější část celé aplikace. Zde vidíme seznam námi jak námi vytvořených eventů, tak eventů, do kterých jsme se přidali. Tlačítky v horní části ovládáme zobrazené eventy v historii/nadcházající eventy či seřazení eventu podle data. V případě více jak 10 eventu na stránku je dostupné tzv. pagination, čili můžeme plynule přecházet mezi jednotlivými stránkami.

### Vytvoření eventu
```http
  GET /create
```
Slouží pro intuitivní tvorbu eventu. Přes validační schéma poskytované vee-validate až po mnou vyrobený autocomplete pro adresy připojený na MapBoxAPI.

### Zobrazení eventu
```http
  GET /event/<event_id>
```
Zobrazí event podle daného ID. Zobrazuje všechny kategorie daného eventu s možnosti přidat se do každé kategorie uživatelem. Důležitou vlastností je tedy organizace náhradníků, kdy se odhlášením uživatele "nenahradníka" provede pasování náhradníků na aktivní účastníky. Pokud je event vytvořený momentálním uživatelem, může ho odstranit pomocí ikony koše. Je zde i možnost vygenerovat soubor iCal pro Apple kalendář.

## Používané externí pluginy
### Vee-Validate
Plugin používaný pro validaci dat na straně klienta.
https://vee-validate.logaretm.com/v4/

### vue3-notification
Plugin používán pro notifikace v aplikaci.
https://github.com/kyvg/vue3-notification

### pinia
Používán pro tzv. stores.
https://pinia.vuejs.org

### SweetAlerts2
Používán pro potvrzovací dialogy.
https://sweetalert2.github.io

## Okomentování požadavků
### Dokumentace
ano
### HTML
Validita - ano, pár projevů Vue se validatoru nelíbilo, ale odhaduji, že to je akceptovatelné

Sémantické značky - ano, občasné využití nav, aside, header

Grafika - SVG / Canvas - pro tento účel jsem přidal SVG ikonu koše

Média/audio prvky - nevhodné do aplikace. Určitě by to nebyl problém, ale je to zbytečné.

Formulářové prvky - vlastní validace v JS pomocí Vee-validate

Offline aplikace - je nutné připojení na API, jen ošetřeno

### CSS
Pokročilé selektory - běžné

Vendor prefiy - jedenkrát použito

CSS Transformace 2D/3D - nevhodné do aplikace

CSS Animace - dvě animace. Jedna je rotující koš u 'event' a druhá je loading kolečko, vyskytující se téměř všude.

Media queries - ano
### JS
OOP přístup - ano

Použití frameworku - ano, Vue

Použití pokročilých JS API - LocalStorage pro uchovávání JWT tokenu - jinak pro komunikaci s moji API využiván Axios

Funkční historie - vlastní nátura Vue

Offline aplikace - stav zjištuji a ošetřuji

JS Práce s SVG - nikoliv, zbytečné

### Ostatní
Kompletnost řešení - mé zadání jsem dodržel

Estetičnost - prosím prominout login a register, ale nemám již sílu vylepšit.

## Závěr
S projektem jsem vcelku spokojen a předmět mně velice bavil. Bohužel jsem udělal chybu a nenechal si ho do 4. semestru, kde bych mu mohl věnovat více času. S tím, co vše jsme museli ve 2. udělat, jsem tomu nevěnoval tolik, co bych chtěl.




