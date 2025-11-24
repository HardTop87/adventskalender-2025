document.addEventListener('DOMContentLoaded', () => {
    // --- KONSTANTEN UND VARIABLEN ---
    const tuerElemente = document.querySelectorAll('.tuer'); 
    const modal = document.getElementById('modal');
    const schliessenBtn = document.querySelector('.schliessen-btn');
    const modalTitel = document.getElementById('modal-titel');
    const modalText = document.getElementById('modal-text');
    const flaggen = document.querySelectorAll('.flag-icon');
    const navPrev = document.getElementById('nav-prev');
    const navNext = document.getElementById('nav-next');
    
    let aktuellesTuerchen = 1;
    
    // Datum - nicht mehr benötigt, da alle Türchen verfügbar sind
    const ADVENTSKALENDER_JAHR = 2025; 

    // Speicherung
    const GEOEFFNET_STATUS_KEY = 'adventskalender_geoeffnet';
    const SPRACHE_KEY = 'adventskalender_sprache';

    // --- 1. ÜBERSETZUNGEN DEFINIEREN ---
    const TRANSLATIONS = {
        'site_title': {
            'de': 'Mein Modern Adventskalender',
            'en': 'My Modern Advent Calendar'
        },
        'default_content': {
            'de': 'Herzlichen Glückwunsch! Du hast Türchen geöffnet.',
            'en': 'Congratulations! You have opened a door.'
        },
        'locked_title': {
            'de': 'Noch nicht geöffnet! 🔒',
            'en': 'Not yet unlocked! 🔒'
        },
        'locked_wait': {
            'de': 'Wir müssen uns noch etwas gedulden. Die Vorfreude ist doch das Schönste! 😊',
            'en': 'We still have to be patient. The anticipation is the best part! 😊'
        },
        'month_name': {
            'de': 'Dezember', 
            'en': 'December'
        }
    };
    
    // Hilfsfunktion für englische Nachsilben
    function getNumberSuffix(day) {
        if (day > 3 && day < 21) return 'th'; 
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }

    // --- 2. HILFSFUNKTIONEN SPRACHE ---

    let aktuelleSprache = localStorage.getItem(SPRACHE_KEY) || 'de';

    function setLanguage(lang) {
        aktuelleSprache = lang;
        localStorage.setItem(SPRACHE_KEY, lang);
        
        document.documentElement.lang = lang;
        document.getElementById('site-title').textContent = TRANSLATIONS['site_title'][lang];

        const defaultContentElement = document.querySelector('[data-key="default_content"]');
        if (defaultContentElement) {
            defaultContentElement.textContent = TRANSLATIONS['default_content'][lang];
        }
        
        flaggen.forEach(flag => {
            flag.classList.toggle('active', flag.dataset.lang === lang);
        });
        
        // Wenn Modal geöffnet ist, aktualisiere den Inhalt
        if (modal.style.display === 'block' && aktuellesTuerchen) {
            modalTitel.textContent = `Türchen ${aktuellesTuerchen}`;
            modalText.innerHTML = tuerchenInhalte[aktuellesTuerchen][aktuelleSprache] || 
                                 tuerchenInhalte[aktuellesTuerchen]['de'] || 
                                 'Content missing.';
        }
    }

    // Event Listener für die Flaggen
    flaggen.forEach(flag => {
        flag.addEventListener('click', () => {
            setLanguage(flag.dataset.lang);
        });
    });

    // Sprache beim Laden initialisieren
    setLanguage(aktuelleSprache);


    // --- 3. TÜRCCHEN-INHALTE DEFINIEREN (JETZT KOMPLETT) ---
    
    const tuerchenInhalte = {
        '1': {
            'de': 'Willkommen! Hier beginnt die Weihnachtszeit. Dein erstes Türchen enthält den Wunsch nach einem tollen Tag. ✨',
            'en': 'Welcome! The Christmas season begins here. Your first door contains a wish for a great day. ✨'
        },
        '2': {
            'de': 'Heute gibt es eine heiße Schokolade mit Sahne! ☕',
            'en': 'Today there\'s hot chocolate with whipped cream! ☕'
        },
        // --- HINZUGEFÜGT: Platzhalter für alle fehlenden Türchen, damit die Logik nicht fehlschlägt ---
        '3': { 'de': 'Inhalt für Türchen 3 (DE) | BITTE ERSETZEN', 'en': 'Content for door 3 (EN) | PLEASE REPLACE' },
        '4': { 'de': 'Inhalt für Türchen 4 (DE) | BITTE ERSETZEN', 'en': 'Content for door 4 (EN) | PLEASE REPLACE' },
        '5': { 'de': 'Inhalt für Türchen 5 (DE) | BITTE ERSETZEN', 'en': 'Content for door 5 (EN) | PLEASE REPLACE' },
        '6': { 'de': 'Inhalt für Türchen 6 (DE) | BITTE ERSETZEN', 'en': 'Content for door 6 (EN) | PLEASE REPLACE' },
        '7': { 'de': 'Inhalt für Türchen 7 (DE) | BITTE ERSETZEN', 'en': 'Content for door 7 (EN) | PLEASE REPLACE' },
        '8': { 'de': 'Inhalt für Türchen 8 (DE) | BITTE ERSETZEN', 'en': 'Content for door 8 (EN) | PLEASE REPLACE' },
        '9': { 'de': 'Inhalt für Türchen 9 (DE) | BITTE ERSETZEN', 'en': 'Content for door 9 (EN) | PLEASE REPLACE' },
        '10': { 'de': 'Inhalt für Türchen 10 (DE) | BITTE ERSETZEN', 'en': 'Content for door 10 (EN) | PLEASE REPLACE' },
        '11': { 'de': 'Inhalt für Türchen 11 (DE) | BITTE ERSETZEN', 'en': 'Content for door 11 (EN) | PLEASE REPLACE' },
        '12': { 'de': 'Inhalt für Türchen 12 (DE) | BITTE ERSETZEN', 'en': 'Content for door 12 (EN) | PLEASE REPLACE' },
        '13': { 'de': 'Inhalt für Türchen 13 (DE) | BITTE ERSETZEN', 'en': 'Content for door 13 (EN) | PLEASE REPLACE' },
        '14': { 'de': 'Inhalt für Türchen 14 (DE) | BITTE ERSETZEN', 'en': 'Content for door 14 (EN) | PLEASE REPLACE' },
        '15': { 'de': 'Inhalt für Türchen 15 (DE) | BITTE ERSETZEN', 'en': 'Content for door 15 (EN) | PLEASE REPLACE' },
        '16': { 'de': 'Inhalt für Türchen 16 (DE) | BITTE ERSETZEN', 'en': 'Content for door 16 (EN) | PLEASE REPLACE' },
        '17': { 'de': 'Inhalt für Türchen 17 (DE) | BITTE ERSETZEN', 'en': 'Content for door 17 (EN) | PLEASE REPLACE' },
        '18': { 'de': 'Inhalt für Türchen 18 (DE) | BITTE ERSETZEN', 'en': 'Content for door 18 (EN) | PLEASE REPLACE' },
        '19': { 'de': 'Inhalt für Türchen 19 (DE) | BITTE ERSETZEN', 'en': 'Content for door 19 (EN) | PLEASE REPLACE' },
        '20': { 'de': 'Inhalt für Türchen 20 (DE) | BITTE ERSETZEN', 'en': 'Content for door 20 (EN) | PLEASE REPLACE' },
        '21': { 'de': 'Inhalt für Türchen 21 (DE) | BITTE ERSETZEN', 'en': 'Content for door 21 (EN) | PLEASE REPLACE' },
        '22': { 'de': 'Inhalt für Türchen 22 (DE) | BITTE ERSETZEN', 'en': 'Content for door 22 (EN) | PLEASE REPLACE' },
        '23': { 'de': 'Inhalt für Türchen 23 (DE) | BITTE ERSETZEN', 'en': 'Content for door 23 (EN) | PLEASE REPLACE' },
        '24': {
            'de': 'Frohe Weihnachten! Das größte Geschenk ist ein Code-Commit. 🎁',
            'en': 'Merry Christmas! The biggest gift is a code commit. 🎁'
        }
    };


    // HILFSFUNKTIONEN ZUM ZUSTANDSMANAGEMENT
    function ladeGeoeffneteTueren() {
        const gespeicherterStatus = localStorage.getItem(GEOEFFNET_STATUS_KEY);
        try {
            return gespeicherterStatus ? JSON.parse(gespeicherterStatus) : {};
        } catch (e) {
            console.error("Fehler beim Laden des gespeicherten Status:", e);
            return {};
        }
    }

    function speichereGeoeffneteTuer(tuerID, geoeffneteTueren) {
        geoeffneteTueren[tuerID] = true;
        localStorage.setItem(GEOEFFNET_STATUS_KEY, JSON.stringify(geoeffneteTueren));
    }
    
    const geoeffneteTueren = ladeGeoeffneteTueren();

    function zeigeTuerchenInhalt(nummer, inhalte) {
        aktuellesTuerchen = nummer;
        modalTitel.textContent = `Türchen ${nummer}`;
        modalText.innerHTML = inhalte[nummer][aktuelleSprache] || inhalte[nummer]['de'] || 'Content missing.';
        
        // Navigationsbuttons aktualisieren
        navPrev.style.display = (nummer > 1) ? 'block' : 'none';
        navNext.style.display = (nummer < 24) ? 'block' : 'none';
        
        modal.style.display = 'block';
    }


    // --- 4. KLICK-HANDLER FÜR TÜRCHEN (alle Türchen sind verfügbar) ---

    tuerElemente.forEach(tuer => {
        const tuerID = tuer.id;
        const nummer = parseInt(tuerID.split('-')[1]);
        
        // Markiere bereits geöffnete Türchen
        if (geoeffneteTueren[tuerID]) {
            tuer.classList.add('geoeffnet');
        }

        // --- EVENT-LISTENER FÜR TÜRCCHEN-KLICK ---
        tuer.addEventListener('click', () => {
            const istBereitsGeoeffnet = tuer.classList.contains('geoeffnet');
            
            // Zeige den Inhalt
            zeigeTuerchenInhalt(nummer, tuerchenInhalte);

            // Markiere als geöffnet, falls noch nicht geschehen
            if (!istBereitsGeoeffnet) {
                tuer.classList.add('geoeffnet');
                speichereGeoeffneteTuer(tuerID, geoeffneteTueren);
            }
        });
    });


    // --- 5. LOGIK ZUM SCHLIESSEN DES MODALS ---
    schliessenBtn.addEventListener('click', () => { modal.style.display = 'none'; });
    window.addEventListener('click', (event) => { if (event.target === modal) { modal.style.display = 'none'; } });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && modal.style.display === 'block') { modal.style.display = 'none'; } });

    // --- 6. NAVIGATIONS-LOGIK FÜR PFEILE ---
    navPrev.addEventListener('click', () => {
        if (aktuellesTuerchen > 1) {
            const neueTuernummer = aktuellesTuerchen - 1;
            const neueTuer = document.getElementById(`tuer-${neueTuernummer}`);
            if (neueTuer && !neueTuer.classList.contains('geoeffnet')) {
                neueTuer.classList.add('geoeffnet');
                speichereGeoeffneteTuer(`tuer-${neueTuernummer}`, geoeffneteTueren);
            }
            zeigeTuerchenInhalt(neueTuernummer, tuerchenInhalte);
        }
    });

    navNext.addEventListener('click', () => {
        if (aktuellesTuerchen < 24) {
            const neueTuernummer = aktuellesTuerchen + 1;
            const neueTuer = document.getElementById(`tuer-${neueTuernummer}`);
            if (neueTuer && !neueTuer.classList.contains('geoeffnet')) {
                neueTuer.classList.add('geoeffnet');
                speichereGeoeffneteTuer(`tuer-${neueTuernummer}`, geoeffneteTueren);
            }
            zeigeTuerchenInhalt(neueTuernummer, tuerchenInhalte);
        }
    });

    // Tastatur-Navigation (Pfeiltasten)
    document.addEventListener('keydown', (event) => {
        if (modal.style.display === 'block') {
            if (event.key === 'ArrowLeft' && aktuellesTuerchen > 1) {
                navPrev.click();
            } else if (event.key === 'ArrowRight' && aktuellesTuerchen < 24) {
                navNext.click();
            }
        }
    });
});
