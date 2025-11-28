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
            'de': 'CoCoCo Adventskalender',
            'en': 'CoCoCo Advent Calendar'
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
            zeigeTuerchenInhalt(aktuellesTuerchen, tuerchenInhalte);
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
            'titel_de': 'Türchen 1 – ROI und Integration',  // Optional: Eigener Titel auf Deutsch (leer = "Türchen 1")
            'titel_en': 'Day 1 – ROI & integration',  // Optional: Eigener Titel auf Englisch (leer = "Door 1")
            'de': '<b>Am ersten Tag von <b>CoCoCo</b> Christmas enthüllen wir eine kleine Idee darüber, woher der ROI in der Integration wirklich stammt.</b> <br> <br> Der ROI (Return on Investment) in der Integration ist ein bisschen wie ein Weihnachtsessen. Es ist selten ein einziges spektakuläres Gericht, das alle glücklich macht, sondern die Summe vieler kleiner, richtig gemachter Dinge. Wenn Daten aus MIS, Druckvorstufe, Produktion und Logistik endlich an einem Tisch sitzen, wird die Planung ruhiger, die Priorisierung klüger und die Kostenrechnung hört auf, ein Ratespiel zu sein. Die Forschung zur Smart Factory wiederholt immer wieder die gleiche stille Wahrheit: Geschlossene Datenkreisläufe reduzieren Ausschuss und stabilisieren den Output – meistens, weil Probleme sichtbar werden, bevor sie sich zu einem Drama entwickeln. <b>CoCoCo</b> ist im Wesentlichen der "Küchenpass", der es diesen kleinen Verbesserungen ermöglicht, den gesamten Auftragslebenszyklus zu durchlaufen, ohne dass Sie das Restaurant komplett umbauen müssen.',
            'en': '<b>On the 1st day of CoCoCo Christmas, we’re unwrapping a small idea about where ROI in integration really comes from.</b> <br> <br> ROI in integration is a bit like Christmas dinner. It is rarely one spectacular dish that makes everyone happy, it is the sum of many small things done right. When data from MIS, prepress, production, and logistics finally sits at one table, planning gets calmer, prioritization gets smarter, and costing stops being a guessing game. Smart factory research keeps repeating the same quiet truth, closed data loops cut waste and stabilize output, mostly because problems get visible before they turn into drama. <b>CoCoCo</b> is essentially the kitchen pass that lets these small improvements travel through the whole order lifecycle without you having to rebuild the restaurant.',
            'bild': ''  // Optional: Fügen Sie hier eine Bild-URL ein, z.B. 'https://example.com/bild1.jpg'
        },
        '2': {
            'titel_de': 'Türchen 2 – EU-Datengesetz',  // Optional: Eigener Titel
            'titel_en': 'Day 2 – EU Data Act',  // Optional: Eigener Titel
            'de': '<b>Am 2. Tag von <b>CoCoCo</b> Christmas enthüllen wir eine kleine Idee darüber, was das EU-Datengesetz vernetzten Druckereien still und leise unter den Baum legt.</b> <br> <br> Das EU-Datengesetz ist im Grunde eine Notiz aus Brüssel, die besagt: „Die Daten, die Ihre vernetzten Maschinen produzieren, stehen Ihnen zur Verfügung, und Sie entscheiden, was damit geschieht.“ Da das Gesetz im Januar 2024 in Kraft getreten ist und seine Kernpflichten ab September 2025 gelten, müssen Hersteller den Datenzugang auf sichere, strukturierte, maschinenlesbare Weise und grundsätzlich ohne Berechnung zur Verfügung stellen. Sie dürfen Ihre Daten nicht einfach für ihre eigenen Zwecke wiederverwenden oder an andere weitergeben, es sei denn, Sie stimmen dem zu. Für CEOs und CTOs ist die saisonale Botschaft einfach: Jetzt ist ein guter Zeitpunkt, höflich, aber bestimmt Ihre Datenrechte einzufordern, Verträge zu prüfen und sicherzustellen, dass Ihre Integrationsschicht bereit ist, diese Rechte in einen echten operativen Wert umzuwandeln.',
            'en': '<b>On the 2nd day of <b>CoCoCo</b> Christmas, we’re unwrapping a small idea about what the EU Data Act quietly puts under the tree for connected print shops.</b> <br> <br> The EU Data Act is basically Brussels leaving a note that says “the data your connected machines produce is yours to access, and you decide what happens with it.” Since the Act entered into force in January 2024 and its core obligations apply from September 2025, manufacturers must provide data access in a secure, structured, machine readable way, and in principle without charging you for the privilege. They cannot simply reuse your data for their own purposes or pass it on to others unless you agree. For CEOs and CTOs, the seasonal message is simple, now is a good time to politely but firmly ask for your data rights, check contracts, and make sure your integration layer is ready to turn those rights into real operational value.',
            'bild': ''  // Optional: Bild-URL
        },
        '3': {
            'titel_de': 'Türchen 3 – Industrie 4.0 / 5.0 und CoCoCo',
            'titel_en': 'Day 3 – Industry 4.0 / 5.0 & CoCoCo',
            'de': '<b>Am 3. Tag von <b>CoCoCo</b> Christmas enthüllen wir eine kleine Idee darüber, wo <b>CoCoCo</b> zwischen Industrie 4.0 und 5.0 angesiedelt ist.</b><br><br>Industrie 4.0 ist das Kapitel „Lasst uns alles vernetzen und die Fabrik nicht mehr nach Bauchgefühl betreiben“. Industrie 5.0 ist die Fortsetzung, die besagt: „Ja, vernetzt alles, aber stellt auch den Menschen in den Mittelpunkt und gestaltet den Betrieb nachhaltig und widerstandsfähig.“ <b>CoCoCo</b> passt zum 4.0-Teil, weil es Ihre Maschinen und Software zu nutzbaren Echtzeit-Abläufen verbindet. Es passt zum 5.0-Teil, weil es Ihnen erlaubt, sich schrittweise zu verbessern, ohne dass Sie die Werkzeuge wegwerfen müssen, die Ihre Teams bereits kennen – eher wie ein vernünftiger Weihnachtsmann als wie ein Abrisskommando.',
            'en': '<b>On the 3rd day of CoCoCo Christmas, we’re unwrapping a small idea about where <b>CoCoCo</b> fits between Industry 4.0 and 5.0.</b><br><br>Industry 4.0 is the “let’s connect everything and stop running the factory on gut feeling” chapter. Industry 5.0 is the sequel that says “yes, connect everything, but keep people in the centre and make the operation sustainable and resilient too.” <b>CoCoCo</b> fits the 4.0 part because it connects your machines and software into usable, real time flows. It fits the 5.0 part because it lets you improve step by step, without asking you to throw away the tools your teams already know, more like a sensible Santa than a demolition crew.',
            'bild': ''
        },
        '4': {
            'titel_de': 'Türchen 4 – Warum Daten stecken bleiben',
            'titel_en': 'Day 4 – Why Data Gets Stuck',
            'de': '<b>Am 4. Tag von <b>CoCoCo</b> Christmas enthüllen wir eine kleine Idee darüber, warum Daten in Druckereien oft reich an Volumen, aber arm an Nutzung sind.</b><br><br>Den meisten Druckereien mangelt es nicht an Daten, sondern an einem Ort, an dem die Daten miteinander übereinstimmen. MIS hier, Druckvorstufe dort, Maschinensteuerungen drüben, dazu ein bisschen Excel aus Nostalgie – alle spielen verschiedene Strophen desselben Liedes. Ohne klare Verantwortung und ein gemeinsames Zielbild ist sich niemand sicher, welche Daten wirklich wichtig sind, wer sie pflegt und welche Entscheidungen sie verbessern sollen. In der gesamten Fertigungsindustrie ist die Integration immer noch der Blocker, bevor KI und fortschrittliche Automatisierung sich auszahlen, nicht weil die Leute keinen Fortschritt wollen, sondern weil sich der Weg unübersichtlich anfühlt. Die Aufgabe von <b>CoCoCo</b> ist es, diesen Weg weniger stürmisch zu gestalten, indem Daten zuerst normalisiert und verbunden werden, damit die fortgeschritteneren Ideen später auf etwas Solides aufbauen können.',
            'en': '<b>On the 4th day of <b>CoCoCo</b> Christmas, we’re unwrapping a small idea about why data in print shops is often rich in volume but poor in use.</b><br><br>Most print shops are not short of data, they are short of a place where data agrees with itself. MIS here, prepress there, machine controllers over there, plus a little Excel for nostalgia, all playing different verses of the same song. Without clear ownership and a shared target picture, nobody is sure what data really matters, who maintains it, and which decision it should improve. Across manufacturing, integration is still the blocker before AI and advanced automation start paying back, not because people do not want progress, but because the path feels messy. <b>CoCoCo</b>’s job is to make that path less of a snowstorm, by normalising and connecting data first, so that the more advanced ideas later have something solid to stand on.',
            'bild': ''
        },
        '5': {
            'titel_de': 'Türchen 5 - Was ist CoCoCo?',
            'titel_en': 'Day 5 – What is CoCoCo?',
            'de': '<b>Am 5. Tag von <b>CoCoCo</b> Christmas enthüllen wir eine kleine Idee darüber, was Sie tatsächlich erhalten, wenn Sie die <b>CoCoCo</b> Box öffnen.</b><br><br><b>CoCoCo</b> ist nicht die Art von Geschenk, die fertig und verschlossen ankommt, es ist eher wie eine gut ausgestattete Werkstatt für Ihr IT-Team, damit diese Automatisierungen und Dashboards erstellen können, die tatsächlich zu Ihren Prozessen passen, und nicht zu denen eines anderen. Sie behalten Ihre bestehenden Systeme bei, erweitern nur dort, wo es sinnvoll ist, und behalten die Kontrolle über die Prioritäten. Sobald die Datengrundlage stabil ist, können Sie Module höherer Ebene wie KI-Assistenz, Terminplanung oder Optimierung hinzufügen, wenn der Business Case dafür bereit ist. Mit anderen Worten: keine Big-Bang-Transformation, sondern eher ein Aufrüsten des Schlittens im laufenden Betrieb.',
            'en': '<b>On the 5th day of <b>CoCoCo</b> Christmas, we’re unwrapping a small idea about what you actually get when you open the <b>CoCoCo</b> box.</b><br><br><b>CoCoCo</b> is not the kind of gift that arrives finished and locked, it is more like a well stocked workshop for your IT team, so they can build the automations and dashboards that actually match your processes, not someone else’s. You keep your existing systems, you extend only where it makes sense, and you stay in control of priorities. Once the data foundation is stable, you can add higher level modules like AI assistance, scheduling, or optimisation when the business case is ready. In other words, no big bang transformation, more like upgrading the sleigh while it is already flying.',
            'bild': ''
        },
        '6': {
            'titel_de': 'Türchen 6 - Produktionslärm wird Weihnachtskonzert',
            'titel_en': 'Day 6 – Production Noise Becomes Christmas Concert',
            'de': '<b>Am 6. Tag von <b>CoCoCo</b> Christmas enthüllen wir eine kleine Idee darüber, wie man Produktionslärm in etwas verwandelt, das einem Weihnachtskonzert näherkommt.</b><br><br>Stellen Sie sich Ihre Druckerei als ein Orchester vor, das „Stille Nacht“ spielen soll, aber die Hälfte der Instrumente hat unterschiedliche Notenblätter, eine Sektion stimmt noch, und der Schlagzeuger hat die Anweisung überhaupt nicht bekommen. Ihre Maschinen, Systeme und Teams sind diese Instrumente, jedes für sich stark, aber ohne ein gemeinsames Tempo ist das Ergebnis Lärm, keine Musik. <b>CoCoCo</b> ist der Dirigent, der dafür sorgt, dass jedes Instrument denselben Takt hört und von derselben Partitur liest, indem es Daten und Signale in Echtzeit aufeinander abstimmt. Wir schreiben Ihr Lied nicht für Sie, das bleibt Ihr Prozess und Ihre Strategie, aber wir sorgen dafür, dass das Orchester es tatsächlich zusammen spielen kann. Für einen CEO oder CTO bedeutet das weniger improvisierte Soli bei der täglichen Brandbekämpfung und eine saubere Grundlage, um neue „Weihnachtshits“ wie intelligentere Planung oder KI hinzuzufügen, wenn Sie bereit sind.',
            'en': '<b>On the 6th day of <b>CoCoCo</b> Christmas, we’re unwrapping a small idea about turning production noise into something closer to a Christmas concert.</b><br><br>Imagine your print shop as an orchestra that is supposed to play “Silent Night”, but half the instruments are on different sheets, one section is still tuning, and the drummer did not get the memo at all. Your machines, systems, and teams are those instruments, each strong on its own, but without a shared tempo the result is noise, not music. <b>CoCoCo</b> is the conductor who makes sure every instrument hears the same beat and reads from the same score, by aligning data and signals in real time. We do not write your song for you, that remains your process and your strategy, but we make sure the orchestra can actually play it together. For a CEO or CTO, that means fewer improvised solos in daily firefighting and a clean setup to add new “Christmas hits” like smarter planning or AI when you are ready.',
            'bild': ''
        },
        '7': {
            'titel_de': 'Türchen 7 - Produktion, Kapazität & Chaos',
            'titel_en': 'Day 7 – Production, capacity & chaos',
            'de': '<b>Am 7. Tag von <b>CoCoCo</b> Christmas enthüllen wir eine kleine Idee für alle, die versuchen, ihre Druckmaschinen im Dezember am Laufen zu halten.</b><br><br>Diese Jahreszeit fühlt sich oft so an, als würde man drei Hochsaisonwochen auf einmal bewältigen, wobei jeder Auftrag „dringend“ und jede Maschine „kritisch“ ist. Das Schwierige ist nicht, schneller zu drucken, sondern zu entscheiden, was als Nächstes auf welcher Linie läuft, ohne dabei die Rüstzeiten und Nachtschichten zu zerstören. Mit <b>CoCoCo</b> kann Ihr Team MIS, Maschinendaten und Auftragsstatus in einer neutralen Schicht verbinden und dann einfache Regeln und Anwendungen darauf aufbauen, um diese Entscheidungen zu unterstützen. Wir schreiben Ihren Workflow nicht vor – wir geben Ihnen und Ihren Mitarbeitern die Werkzeuge an die Hand, um bestehende Faustregeln in sichtbare, datengesteuerte Abläufe zu verwandeln.<br><br><b>Eine kleine Frage für heute:</b> Wenn Ihr Team morgen eine neutrale Datenschicht hätte, welche Produktionsentscheidung würden Sie zuerst verbessern wollen?',
            'en': '<b>On the 7th day of <b>CoCoCo</b> Christmas, we’re unwrapping a small idea for anyone trying to keep presses running in December.</b><br><br>This season often feels like running three peak weeks at once, with every job “urgent” and every press “critical”. The hard part is not running faster, it is deciding what to run next, on which line, without destroying changeover times and night shifts. With <b>CoCoCo</b>, your team can connect MIS, machine data and job status into one neutral layer, then build simple rules and apps on top to support those decisions. We don’t dictate your workflow – we give you and your people the tools to turn existing rules-of-thumb into visible, data-driven flows.<b><br><br>Small question for today:</b> if your team had one neutral data layer tomorrow, which production decision would you want to improve first?',
            'bild': ''
        },
        '8': {
            'titel_de': 'Türchen 8 - Finanzen, ROI & Transparenz',
            'titel_en': 'Day 8 – Finance, ROI & transparency',
            'de': '<b>Am 8. Tag von <b>CoCoCo</b> Christmas enthüllen wir eine kleine Idee für diejenigen, die am Jahresende Margen erklären müssen.</b><br><br>Budgets, Prognosen und die klassische Frage kommen zusammen: „Was genau haben wir verdient, während all diese Maschinen Überstunden liefen?“ Die Herausforderung besteht darin, dass Finanzkennzahlen, Produktionsdaten und Sales-Pipelines selten an einem Ort zusammenlaufen, sodass Einzelkosten und Margen unscharf bleiben. <b>CoCoCo</b> ermöglicht es Ihrem IT-Team, Produktions- und Auftragsdaten in ein konsistentes Modell zu ziehen und sie für Finanztools und Dashboards zugänglich zu machen. Das Ergebnis ist keine magische KI, es sind einfach sauberere, verknüpfte Zahlen, sodass Sie sehen können, welche Aufträge, Kunden und Linien wirklich die Lichter bezahlen.<br><br><b>Kleine Frage für heute:</b> Woher bezieht Ihre Deckungsbeitragsrechnung eigentlich ihre Produktionsdaten?',
            'en': '<b>On the 8th day of <b>CoCoCo</b> Christmas, we’re unwrapping a small idea for those who have to explain margins at year-end.</b><br><br>Budgets, forecasts and the classic question arrive together: “What exactly did we earn with all these machines running overtime?” The challenge is that financial metrics, production data and sales pipelines rarely live in one place, so unit costs and margins stay fuzzy. <b>CoCoCo</b> lets your IT team pull production and order data into a consistent model and expose it to finance tools and dashboards. The result is not magic AI, it is simply cleaner, connected numbers so you can see which jobs, customers and lines really pay for the lights. <br><br><b>Small question for today:</b> where does your contribution margin calculation actually get its production data from?',
            'bild': ''
        },
        '9': {
            'titel_de': 'Türchen 9 - Architektur, Lock-in & Stack',
            'titel_en': 'Day 9 – Architecture, lock-in & stack',
            'de': '<b>Am 9. Tag von <b>CoCoCo</b> Christmas enthüllen wir eine kleine Idee für diejenigen, die die Systemarchitektur verantworten.</b><br><br>Jede Weihnachtspräsentation scheint „eine Plattform, um alle zu beherrschen“ zu versprechen und bittet Sie stillschweigend, die Hälfte Ihres Stacks herauszureißen. Das wahre Risiko sind Lock-in und brüchige Punkt-zu-Punkt-Integrationen, die in zwei Jahren niemand mehr pflegen möchte. <b>CoCoCo</b> ist als neutrale Integrations- und Datenschicht konzipiert: Ihr Team verbindet Maschinen und Systeme einmal und verwendet dieses Modell dann für viele Anwendungsfälle wieder. Sie behalten die Kontrolle über die Architektur, da Ihre eigenen Entwickler die darüber liegenden Abläufe und Anwendungen erstellen und besitzen, nicht wir.<br><br><b>Kleine Frage für heute:</b> Welche Integration in Ihrem Stack würde am meisten schmerzen, wenn der Anbieter morgen verschwinden würde?',
            'en': '<b>On the 9th day of <b>CoCoCo</b> Christmas, we’re unwrapping a small idea for the people who own the system architecture.</b><br><br>Every Christmas pitch seems to promise “one platform to rule them all” and quietly asks you to rip out half your stack. The real risk is lock-in and brittle point-to-point integrations that nobody wants to maintain in two years’ time. <b>CoCoCo</b> is designed as a neutral integration and data layer: your team connects machines and systems once, then reuses that model for many use cases. You stay in control of the architecture, because your own developers build and own the flows and apps on top, not us.<br><br><b>Small question for today:</b> which integration in your stack would hurt the most if the vendor disappeared tomorrow?',
            'bild': ''
        },
        '10': {
            'titel_de': 'Türchen 10 - Druckvorstufe, Übergabe & Nacharbeit',
            'titel_en': 'Day 10 – Prepress, handover & rework',
            'de': '<b>Am 10. Tag von <b>CoCoCo</b> Christmas enthüllen wir eine kleine Idee für alle, die zwischen Verkaufsversprechen und Druckplatten leben.</b><br><br>Die Druckvorstufe ist der Ort, an dem „Weihnachts-Specials“ zu „Weihnachts-Überraschungen“ werden: späte Änderungen, fehlende Spezifikationen, falsche Profile. Das meiste davon entsteht, weil Informationen zwischen Systemen und Abteilungen verloren gehen, nicht durch den RIP selbst. Mit <b>CoCoCo</b> kann Ihr technisches Team Auftragsspezifikationen, Assets und Freigaben in einer gemeinsamen Datenschicht verbinden, sodass Upstream und Downstream endlich dieselbe Sprache sprechen. Anstatt eines weiteren Portals geben wir Ihnen die Infrastruktur, um manuelle Neueingaben und die damit verbundene Nacharbeit zu reduzieren.<br><br><b>Kleine Frage für heute:</b> Welcher Druckvorstufenfehler wiederholt sich ständig, weil zwei Systeme nie dieselben Auftragsinformationen sehen?',
            'en': '<b>On the 10th day of <b>CoCoCo</b> Christmas, we’re unwrapping a small idea for everyone who lives between sales promises and plates.</b><br><br>Prepress is where “Christmas specials” become “Christmas surprises”: late changes, missing specs, wrong profiles. Most of this comes from information breaking across systems and departments, not from the RIP itself. With <b>CoCoCo</b>, your technical team can connect job specs, assets and approvals into a shared data layer so upstream and downstream finally talk the same language. Instead of another portal, we give you the infrastructure to reduce manual re-entry and the rework that comes with it.<br><br><b>Small question for today:</b> which prepress error keeps repeating because two systems never see the same job information?',
            'bild': ''
        },
        '11': {
            'titel_de': 'Türchen 11 - Betrieb, End-to-End-Übersicht',
            'titel_en': 'Day 11 – Operations, end-to-end view',
            'de': '<b>Am 11. Tag von <b>CoCoCo</b> Christmas enthüllen wir eine kleine Idee für diejenigen, die versuchen, die gesamte Fabrik zu sehen und nicht nur eine einzelne Linie.</b><br><br>Der Betrieb einer Druckerei im Dezember ist wie das Dirigieren mehrerer Orchester in verschiedenen Zeitzonen. Sie wissen vielleicht ungefähr, was jeder Bereich tut, aber nicht, wie sich die Teile in Echtzeit zusammenfügen. <b>CoCoCo</b> ermöglicht es Ihren IT- und Betriebsteams, Auftrags-, Maschinen- und Logistikdaten in einem zentralen Backbone zusammenzuführen, ohne jedes lokale System ändern zu müssen. Von dort aus können Sie die KPIs und Ansichten definieren, die für die Steuerung des Unternehmens wichtig sind – und Ihr Team kann diese, Schritt für Schritt, auf derselben Grundlage aufbauen.<br><br><b>Kleine Frage für heute:</b> Wenn Sie eine Live-Ansicht für den gesamten Betrieb hätten, was müsste darauf zu sehen sein?',
            'en': '<b>On the 11th day of <b>CoCoCo</b> Christmas, we’re unwrapping a small idea for those trying to see the whole factory, not just one line.</b><br><br>Running a print operation in December is like conducting several orchestras in different time zones. You might know roughly what each area is doing, but not how the pieces add up in real time. <b>CoCoCo</b> lets your IT and ops teams bring order, machine and logistics data into one backbone without changing every local system. From there, you can define the KPIs and views that matter for steering the business – and your team can build them, step by step, on top of the same foundation.<br><br><b>Small question for today:</b> if you had one live view for the whole operation, what would have to be on it?',
            'bild': ''
        },
        '12': {
            'titel_de': 'Türchen 12 – Schichten & Krisenmanagement',
            'titel_en': 'Day 12 – Shifts & firefighting',
            'de': '<b>Am 12. Tag von <b>CoCoCo</b> Christmas enthüllen wir eine kleine Idee für diejenigen, die nachts den Pieper tragen.</b><br><br>Bei Nachtschichten vor Weihnachten geht es nicht um Strategie, sondern darum, die Linie am Laufen zu halten und den Lkw pünktlich abfahren zu lassen. Die Verantwortlichen jonglieren mit Telefonanrufen, Papierlisten und mehreren Bildschirmen, oft ohne ein verlässliches Bild davon, „wo stehen wir wirklich gerade?“. <b>CoCoCo</b> gibt Ihren Entwicklern die Werkzeuge an die Hand, um Statussignale von Maschinen und Systemen in einfache, rollenspezifische Ansichten und Warnmeldungen zu sammeln. Es ist kein glänzender Kontrollraum erforderlich – nur die richtigen Live-Informationen, damit Probleme behoben werden, bevor aus einer Verzögerung eine verpasste Lieferung wird.<br><br><b>Kleine Frage für heute:</b> Welches Signal bemerkt Ihre Nachtschicht immer zu spät?',
            'en': '<b>On the 12th day of <b>CoCoCo</b> Christmas, we’re unwrapping a small idea for those who carry the beeper at night.</b><br><br>Night shifts before Christmas are not about strategy, they’re about keeping the line running and the truck leaving on time. People in charge juggle phone calls, paper lists and multiple screens, often without one reliable picture of “where are we really right now?”. <b>CoCoCo</b> gives your developers the tools to collect status signals from machines and systems into simple, role-specific views and alerts. No glossy control room required – just the right live information so problems are handled before a delay turns into a missed delivery.<br><br><b>Small question for today:</b> what is the one signal your night shift always notices too late?',
            'bild': ''
        },
        '13': {
            'titel_de': 'Türchen 13 – Ausfallzeiten & Wartung',
            'titel_en': 'Day 13 – Downtime & maintenance',
            'de': '<b>Am 13. Tag von <b>CoCoCo</b> Christmas enthüllen wir eine kleine Idee für alle, die ungeplante Ausfallzeiten hassen.</b><br><br>Unerwartete Stopps sind der Grinch der Dezember-Produktion, der Kapazität stiehlt, gerade wenn man sie am meisten braucht. Die Daten, um Probleme vorherzusehen, sind oft vorhanden – in Protokollen, Zählern und Alarmen – aber auf verschiedene Hersteller-Tools verteilt. Mit <b>CoCoCo</b> kann Ihr Tech-Team wichtige Maschinensignale in ein vereinheitlichtes Datenmodell ziehen und einfache Regeln oder Skripte entwerfen, um Muster frühzeitig zu kennzeichnen. Es ist keine vollwertige „vorausschauende Wartungsplattform“, aber es gibt Ihnen eine praktische Möglichkeit, Ihre eigene Wartungslogik anhand der bereits vorhandenen Daten zu testen und weiterzuentwickeln.<br><br><b>Kleine Frage für heute:</b> Welcher Fehlermodus in Ihrem Werk wäre es wert, morgen mit einer sehr einfachen Regel überwacht zu werden?',
            'en': '<b>On the 13th day of <b>CoCoCo</b> Christmas, we’re unwrapping a small idea for everyone who hates unplanned downtime.</b><br><br>Unexpected stops are the Grinch of December production, stealing capacity just when you need it most. The data to anticipate problems is often there – in logs, counters and alarms – but split across vendor tools. With <b>CoCoCo</b>, your tech team can pull key machine signals into a unified data model and design simple rules or scripts to flag patterns early. It’s not a full-blown “predictive maintenance platform”, but it gives you a practical way to test and grow your own maintenance logic using the data you already have.<br><br><b>Small question for today:</b> which failure mode in your plant would be worth monitoring with a very simple rule tomorrow?',
            'bild': ''
        },
        '14': {
            'titel_de': 'Türchen 14 – Digitale Budgets & Risiko',
            'titel_en': 'Day 14 – Digital budgets & risk',
            'de': '<b>Am 14. Tag von <b>CoCoCo</b> Christmas enthüllen wir eine kleine Idee für diejenigen, die große Digitalbudgets abzeichnen.</b><br><br>Wenn Anbieter über „digitale Transformation“ sprechen, klingt der Preis oft nach einer neuen Druckmaschine plus einem neuen IT-Team. Die eigentliche Frage ist: Wie minimieren wir das Risiko und vermeiden eine weitere teure Insellösung? <b>CoCoCo</b> fungiert als gemeinsame Integrationsschicht über mehrere Anbieter und Werke hinweg, sodass jedes neue Projekt denselben Backbone wiederverwendet, anstatt bei Null anzufangen. Ihr internes Team treibt die Einführung voran und besitzt die Automatisierungen, was sowohl das finanzielle Risiko als auch die externe Abhängigkeit unter Kontrolle hält.<br><br><b>Kleine Frage für heute:</b> Wie viele Ihrer letzten IT-Projekte haben ein wiederverwendbares Asset geschaffen, nicht nur eine Einzellösung?',
            'en': '<b>On the 14th day of <b>CoCoCo</b> Christmas, we’re unwrapping a small idea for those signing off on big digital budgets.</b><br><br>When vendors talk about “digital transformation”, the price tag often sounds like a new press plus a new IT team. The real question is: how do we de-risk this and avoid another expensive island solution? <b>CoCoCo</b> works as a shared integration layer across multiple vendors and plants, so each new project reuses the same backbone instead of starting from scratch. Your internal team drives the rollout and owns the automations, which keeps both financial risk and external dependency under control.<br><br><b>Small question for today:</b> how many of your last IT projects created a reusable asset, not just a single-point solution?',
            'bild': ''
        },
        '15': {
            'titel_de': 'Türchen 15 – Daten-Governance & EU-Datengesetz',
            'titel_en': 'Day 15 – Data governance & EU Data Act',
            'de': '<b>Am 15. Tag von <b>CoCoCo</b> Christmas enthüllen wir eine kleine Idee für diejenigen, die sich um Data Governance sorgen.</b><br><br>Das EU-Datengesetz hat Maschinendaten still und leise von einem „Nice-to-have“ in ein reguliertes Asset verwandelt, auf das Sie Anspruch auf Zugriff haben. Das ist eine gute Nachricht, wirft aber auch Fragen auf: Wohin gehen diese Daten, wer kann sie sehen, unter welchen Verträgen? <b>CoCoCo</b> bietet Ihrer Organisation eine neutrale Datenschicht, in der Zugriff, Transformationen und Nutzung zentral von Ihrem eigenen Team gesteuert werden können. Sie übergeben diese Macht nicht an ein weiteres proprietäres Cloud-Silo – Sie geben Ihren Entwicklern die Werkzeuge an die Hand, um die von Ihnen definierten Regeln zu implementieren.<br><br><b>Kleine Frage für heute:</b> Wenn ein Maschinenhersteller fragt, wie Sie Ihre Maschinendaten verwalten, könnten Sie in einem Satz antworten?',
            'en': '<b>On the 15th day of <b>CoCoCo</b> Christmas, we’re unwrapping a small idea for the people who worry about data governance.</b><br><br>The EU Data Act has quietly turned machine data from “nice to have” into a regulated asset you are entitled to access. That is good news, but it also raises questions: where does that data go, who can see it, under which contracts? <b>CoCoCo</b> gives your organisation a neutral data layer where access, transformations and usage can be centrally governed by your own team. You are not handing that power to yet another proprietary cloud silo – you are giving your developers the tools to implement the rules you define.<br><br><b>Small question for today:</b> if a machine vendor asked how you govern your machine data, could you answer in one sentence?',
            'bild': ''
        },
        '16': {
            'titel_de': 'Türchen 16 – Automatisierung mit voller Prozesskontrolle',
            'titel_en': 'Day 16 – Automation without losing control',
            'de': '<b>Am 16. Tag von <b>CoCoCo</b> Christmas enthüllen wir eine kleine Idee für diejenigen, die automatisieren wollen, ohne die Kontrolle zu verlieren.</b><br><br>Die Druckvorstufe ist oft der erste Bereich, in dem vorgeschlagen wird, „einfach alles mit KI zu automatisieren“ – und der erste Bereich, in dem das schiefgeht, wenn niemand die Details kontrolliert. Was Sie wirklich brauchen, ist eine Möglichkeit, die Bewegung von Aufträgen, Varianten und Assets zwischen Systemen zu standardisieren und gleichzeitig Ausnahmen dort zuzulassen, wo sie wichtig sind. <b>CoCoCo</b> ermöglicht es Ihrem Team, diese Abläufe in einer gemeinsamen Datenstruktur zu modellieren und sie mit bestehenden Tools zu verbinden, sodass Sie die langweiligen 80 % automatisieren und Expertenhände für die kniffligen 20 % behalten. Sie bleiben für die Regeln verantwortlich, <b>CoCoCo</b> transportiert sie lediglich durch Ihren gesamten Stack.<br><br><b>Kleine Frage für heute:</b> Welchen manuellen Prepress-Schritt würden Sie zuerst automatisieren, wenn Sie den Daten dahinter voll vertrauen könnten?',
            'en': '<b>On the 16th day of <b>CoCoCo</b> Christmas, we’re unwrapping a small idea for those trying to automate without losing control.</b><br><br>Prepress is often the first place people suggest “just automating everything with AI” – and the first place where that goes wrong if nobody controls the details. What you really need is a way to standardise how jobs, variants and assets move between systems, while still allowing exceptions where they matter. <b>CoCoCo</b> lets your team model these flows in a shared data structure and connect them to existing tools, so you automate the boring 80% and keep expert hands for the tricky 20%. You stay in charge of the rules, <b>CoCoCo</b> just carries them across your stack.<br><br><b>Small question for today:</b> which manual prepress step would you automate first if you could fully trust the data behind it?',
            'bild': ''
        },
        '17': {
            'titel_de': 'Türchen 17 – Konsistenz über mehrere Standorte',
            'titel_en': 'Day 17 – Multi-site consistency',
            'de': '<b>Am 17. Tag von <b>CoCoCo</b> Christmas enthüllen wir eine kleine Idee für diejenigen, die mehr als einen Standort managen.</b><br><br>Wenn Sie mehrere Standorte betreiben, haben Sie wahrscheinlich mehrere „Wahrheiten“: eine Art der Berichterstattung in Werk A, eine andere in Werk B und eine dritte in Excel in der Zentrale. Das macht Vergleiche, den Transfer von Best Practices und die Planung unnötig schwierig. <b>CoCoCo</b> ermöglicht es Ihren IT- und Betriebsteams, ein gemeinsames Datenmodell für Aufträge, Jobs und Maschinen zu definieren, auf das alle Standorte abbilden können, ohne sie zu identischen Systemen zu zwingen. Sie erhalten vergleichbare KPIs und Playbooks auf Gruppenebene, während jeder Standort die Tools behält, die für ihn bereits funktionieren.<br><br><b>Kleine Frage für heute:</b> Welche KPI würde Ihre Entscheidungen am meisten verändern, wenn sie über alle Standorte hinweg wirklich vergleichbar wäre?',
            'en': '<b>On the 17th day of <b>CoCoCo</b> Christmas, we’re unwrapping a small idea for those juggling more than one site.</b><br><br>If you run multiple locations, you probably have multiple “truths”: one way of reporting in Plant A, another in Plant B, and a third in Excel at HQ. That makes comparisons, best-practice transfer and planning unnecessarily hard. <b>CoCoCo</b> enables your IT and operations teams to define a common data model for orders, jobs and machines that all locations can map to, without forcing them into identical systems. You get comparable KPIs and playbooks at group level, while each site keeps the tools that already work for them.<br><br><b>Small question for today:</b> which KPI would change your decisions most if it were truly comparable across all sites?',
            'bild': ''
        },
        '18': {
            'titel_de': 'Türchen 18 – Echtzeit-Signale vom Shopfloor',
            'titel_en': 'Day 18 – Real-time shopfloor signals',
            'de': '<b>Am 18. Tag von <b>CoCoCo</b> Christmas enthüllen wir eine kleine Idee für diejenigen, die nach der Shopfloor-Uhr leben.</b><br><br>Die meisten Probleme beginnen klein: eine Platte ist hier zu spät, ein Materialproblem dort, ein Auftrag steckt in einer Warteschlange fest. Bis jemand es bemerkt, ist der Zeitplan bereits gebrochen. Mit <b>CoCoCo</b> kann Ihr technisches Team wichtige „Frühwarn“-Ereignisse aus MIS, Druckvorstufe und Maschinen in einfache Dashboards, Andon-Boards oder Warnmeldungen leiten. Anstatt die Mitarbeiter auf zehn verschiedene Systeme schauen zu lassen, geben Sie ihnen eine Signalschicht, auf die sie in Echtzeit reagieren können.<br><br><b>Kleine Frage für heute:</b> Wenn Sie eine Frühwarnung 30 Minuten früher erhalten könnten, welche würde Ihnen am meisten Stress ersparen?',
            'en': '<b>On the 18th day of <b>CoCoCo</b> Christmas, we’re unwrapping a small idea for those who live on the shopfloor clock.</b><br><br>Most issues start small: a plate late here, a material problem there, a job stuck in a queue. By the time someone notices, the schedule is already broken. With <b>CoCoCo</b>, your technical team can wire key “early warning” events from MIS, prepress and machines into simple dashboards, Andon boards or alerts. Instead of asking people to watch ten different systems, you give them one signal layer they can actually act on in real time.<br><br><b>Small question for today:</b> if you could get one early warning 30 minutes sooner, which one would save you the most stress?',
            'bild': ''
        },
        '19': {
            'titel_de': 'Türchen 19 – Rüstzeiten und komplexe Auftragslage',
            'titel_en': 'Day 19 – Changeovers & messy mixes',
            'de': '<b>Am 19. Tag von <b>CoCoCo</b> Christmas enthüllen wir eine kleine Idee für diejenigen, die mit kurzen Auflagen und komplexen Auftragslagen kämpfen.</b><br><br>Im Dezember möchte jeder Kunde der einzige Kunde sein. Kleine Auflagen, Eilaufträge und „nur noch eine Version“ zerstören sorgfältig geplante Sequenzen und Rüstvorgänge. <b>CoCoCo</b> ermöglicht es Ihrem Team, über eine einzige API auf die relevanten Auftrags- und Maschinendaten zuzugreifen, sodass Sie Ihre eigene Planungslogik, Regeln und Hilfswerkzeuge darüber prototypisieren können. Sie sind nicht an einen Black-Box-Planer gebunden: Ihre Produktions- und Entwicklungsteams können experimentieren, lernen und die Regeln verfeinern, die für Ihre spezifische Mischung funktionieren.<br><br><b>Kleine Frage für heute:</b> Wird Ihr aktueller Zeitplan mehr von Regeln – oder davon, wer zuletzt am lautesten geschrien hat, bestimmt?',
            'en': '<b>On the 19th day of <b>CoCoCo</b> Christmas, we’re unwrapping a small idea for those fighting with short runs and messy mixes.</b><br><br>December is when every customer wants to be the only customer. Small runs, rush jobs and “just one more version” destroy carefully planned sequences and changeovers. <b>CoCoCo</b> lets your team access the relevant job and machine data through one API so you can prototype your own scheduling logic, rules and helper tools on top. You are not stuck with a black-box scheduler: your production and dev people can experiment, learn and refine the rules that work for your specific mix.<br><br><b>Small question for today:</b> is your current schedule driven more by rules – or by who shouted loudest last?',
            'bild': ''
        },
        '20': {
            'titel_de': 'Türchen 20 – Vom Excel-Sheet zur Szenarienplanung',
            'titel_en': 'Day 20 – From Excel to scenarios',
            'de': '<b>Am 20. Tag von <b>CoCoCo</b> Christmas enthüllen wir eine kleine Idee für alle, die in Tabellenkalkulationen leben.</b><br><br>Die meisten Investitions- und Preisentscheidungen im Druck beginnen immer noch in Excel, oft losgelöst von den Live-Realitäten der Produktion. Das macht die Szenarienplanung langsam und schwer vertrauenswürdig. <b>CoCoCo</b> bietet Ihrer Organisation eine Möglichkeit, echte Produktions-, Auftrags- und Kostentreiber in einen konsistenten Datenservice zu integrieren, den Ihr Finanzteam in seine eigenen Tools einbinden kann. Die Tabellenkalkulationen bleiben vielleicht, aber die Zahlen dahinter werden schneller, sauberer und näher an der tatsächlichen Fertigung.<br><br><b>Kleine Frage für heute:</b> Wie viele Ihrer „Was wäre wenn“-Szenarien basieren auf der Realität des letzten Jahres statt auf den Daten der letzten Woche?',
            'en': '<b>On the 20th day of <b>CoCoCo</b> Christmas, we’re unwrapping a small idea for everyone who lives in spreadsheets.</b><br><br>Most investment and pricing decisions in print still start in Excel, often disconnected from live production realities. That makes scenario planning slow and hard to trust. <b>CoCoCo</b> gives your organisation a way to connect real production, order and cost drivers into a consistent data service your finance team can plug into their own tools. The spreadsheets may stay, but the numbers behind them become faster, cleaner and closer to the actual shopfloor.<br><br><b>Small question for today:</b> how many of your “what if” scenarios are based on last year’s reality instead of last week’s data?',
            'bild': ''
        },
        '21': {
            'titel_de': 'Türchen 21 – Build vs. Buy: Das Gleichgewicht',
            'titel_en': 'Day 21 – Build vs. buy balance',
            'de': '<b>Am 21. Tag von <b>CoCoCo</b> Christmas enthüllen wir eine kleine Idee für diejenigen, die in der „Build or Buy“-Schleife feststecken.</b><br><br>Die Build-versus-Buy-Diskussion ist nie wirklich vorbei, besonders in einem komplexen Stack wie dem Druckbereich. Alles zu kaufen führt zu Silos; alles selbst zu entwickeln führt zu einem Rückstand, den niemand aufarbeiten kann. <b>CoCoCo</b> ist als „Zwischenlösung“ konzipiert: Sie kaufen den Integrations- und Daten-Backbone, und Ihre eigenen Entwickler bauen die unternehmensspezifische Logik darauf auf. Auf diese Weise setzen Sie knappe Engineering-Ressourcen für das ein, was Sie wirklich von der Konkurrenz unterscheidet, während die Plattform die grundlegenden Verbindungen abdeckt, die jedes Werk benötigt.<br><br><b>Kleine Frage für heute:</b> Welche Teile Ihres Stacks sind echte Unterscheidungsmerkmale – und welche sind nur grundlegende Infrastruktur, die Sie lieber nicht neu bauen würden?',
            'en': '<b>On the 21st day of <b>CoCoCo</b> Christmas, we’re unwrapping a small idea for those stuck in the “build or buy” loop.</b><br><br>The build-versus-buy discussion is never really over, especially in a complex stack like print. Buying everything leads to silos; building everything leads to a backlog nobody can clear. <b>CoCoCo</b> is designed as the “in-between”: you buy the integration and data backbone, and your own developers build the company-specific logic on top. That way, you keep scarce engineering effort for what truly differentiates you, while the platform covers the plumbing that every plant needs.<br><br><b>Small question for today:</b> which parts of your stack are true differentiators – and which ones are just plumbing you’d rather not rebuild?',
            'bild': ''
        },
        '22': {
            'titel_de': 'Türchen 22 – Qualität & Feedback-Schleifen',
            'titel_en': 'Day 22 – Quality & feedback loops',
            'de': '<b>Am 22. Tag von <b>CoCoCo</b> Christmas enthüllen wir eine kleine Idee für diejenigen, denen wichtig ist, warum Aufträge fehlschlagen, nicht nur, dass sie fehlschlagen.</b><br><br>Wenn ein Auftrag in der Produktion fehlschlägt, erfährt die Druckvorstufe oft spät und ohne Kontext davon: „Die Datei war falsch“ ist nicht gerade eine Diagnose. Die eigentliche Erkenntnis wäre, Produktionsvorfälle mit den vorgelagert verwendeten Dateien, Einstellungen und Workflows zu verknüpfen. Mit <b>CoCoCo</b> kann Ihr Team Ereignisse und Metriken systemübergreifend verknüpfen, sodass wiederkehrende Probleme zu sichtbaren Mustern anstelle von Anekdoten werden. Das ermöglicht Ihnen, Vorlagen, Prüfungen und Automatisierungen dort anzupassen, wo sie tatsächlich fehlschlagen – und Daten zu haben, um die Auswirkungen zu belegen.',
            'en': '<b>On the 22nd day of <b>CoCoCo</b> Christmas, we’re unwrapping a small idea for those who care about why jobs fail, not just that they fail.</b><br><br>When a job breaks in production, prepress often hears about it late and without context: “the file was wrong” is not exactly a diagnostic. The real insight would be to tie back production incidents to files, settings and workflows used upstream. With <b>CoCoCo</b>, your team can link events and metrics across systems, so recurring issues become visible patterns instead of anecdotes. That allows you to adjust templates, checks and automations where they actually break – and have data to prove the impact.',
            'bild': ''
        },
        '23': {
            'titel_de': 'Türchen 23 – Roadmaps, die wirklich vorankommen',
            'titel_en': 'Day 23 – Roadmaps that actually move',
            'de': '<b>Am 23. Tag von <b>CoCoCo</b> Christmas enthüllen wir eine kleine Idee für diejenigen, die die Roadmap glaubwürdig gestalten müssen.</b><br><br>Große digitale Programme lieben große Folien und lange Roadmaps, aber der Betrieb lebt von täglichen Einschränkungen: Personal, Schichten, Maschinen, Kunden. Sie benötigen einen Weg, sich hin zu einer stärker integrierten, automatisierten Fabrik zu bewegen, ohne alles auf ein einziges riesiges Projekt zu setzen. <b>CoCoCo</b> ermöglicht es Ihrer Organisation, eine Richtung vorzugeben – eine gemeinsame Integrations- und Datenschicht – und dann darauf aufbauend in kleinen, überschaubaren Schritten Mehrwert zu liefern. Jedes Projekt fügt dem gleichen Backbone Funktionen hinzu, sodass sich Ihre Roadmap aufbaut, anstatt zu fragmentieren.',
            'en': '<b>On the 23rd day of <b>CoCoCo</b> Christmas, we’re unwrapping a small idea for those who have to make the roadmap believable.</b><br><br>Big digital programmes love big slides and long roadmaps, but operations lives in daily constraints: people, shifts, machines, customers. You need a way to move towards a more integrated, automated factory without betting everything on one huge project. <b>CoCoCo</b> lets your organisation set a direction – one shared integration and data layer – and then deliver value in small, contained steps on top of it. Each project adds capabilities to the same backbone, so your roadmap compounds instead of fragmenting.',
            'bild': ''
        },
        '24': {
            'titel_de': 'Türchen 24 - Fröhliche Weihnachten und ein glückliches neues Jahr!',
            'titel_en': 'Day 24 - A very merry Christmas and a Happy New Year!',
            'de': '<b>Vielen Dank, dass Sie uns auf unserer Reise durch die 24 kleinen Ideen begleitet haben, die Produktionsdaten in echten Mehrwert verwandeln.</b><br><br>Alle Ideen, die wir enthüllt haben – von ROI und EU-Datengesetz-Konformität über die Reduzierung von Nacharbeit bis zur Steigerung der Schichteffizienz – teilen ein Kernkonzept: Wahre digitale Transformation beginnt mit einer neutralen Datenschicht, die Ihr Team kontrolliert. Wenn diese kleinen Ideen einen großen Gedanken für Ihren Betrieb ausgelöst haben, lassen Sie uns diesen in die Realität umsetzen.<br> <br> <b>Für alle, die noch im Dezember oder Januar eine Demo mit uns vereinbaren, haben wir ein ganz besonderes Angebot vorbereitet. <br> Beginnen Sie mit dem Aufbau Ihres eigenen Daten-Backbones: </b><a href="https://meetings-eu1.hubspot.com/andreas-aplien/round-robin-salesteam?uuid=4f0e3f45-7fcf-41c3-b134-d7c99e67796c" style="color: #FF79C9;"" target="_blank"><b>Buchen Sie jetzt Ihre Demo!</a>',
            'en': '<b>Thank you for joining our journey through the 24 small ideas that turn production data into real value.</b><br><br>All the ideas we’ve unwrapped—from ROI and Data Act compliance to reducing rework and increasing shift efficiency—share one core concept: true digital transformation starts with a neutral data layer that your team controls. If these small ideas sparked a big thought for your operation, let’s make it a reality.<br> <br> <b>For anyone scheduling a demo with us in December or January, we have a very special offer waiting for you. <br> Start building your own data backbone:</b> </b> <a href="https://meetings-eu1.hubspot.com/andreas-aplien/round-robin-salesteam?uuid=4f0e3f45-7fcf-41c3-b134-d7c99e67796c" style="color: #FF79C9;"" target="_blank"><b>Book your demo now!</a>',
            'bild': ''
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
        
        // Titel setzen (entweder eigener Titel oder Standard "Türchen X")
        const eigenertitel = inhalte[nummer][`titel_${aktuelleSprache}`];
        if (eigenertitel && eigenertitel.trim() !== '') {
            modalTitel.textContent = eigenertitel;
        } else {
            modalTitel.textContent = aktuelleSprache === 'de' ? `Türchen ${nummer}` : `Door ${nummer}`;
        }
        
        // Text setzen
        const textInhalt = inhalte[nummer][aktuelleSprache] || inhalte[nummer]['de'] || 'Content missing.';
        
        // Bild hinzufügen, falls vorhanden
        const bildUrl = inhalte[nummer]['bild'];
        const modalInhalt = document.querySelector('.modal-inhalt');
        
        if (bildUrl && bildUrl.trim() !== '') {
            // Zweispaltiges Layout mit Bild
            modalInhalt.classList.add('mit-bild');
            modalText.innerHTML = `
                <div class="modal-text-spalte">${textInhalt}</div>
                <div class="modal-bild-spalte">
                    <img src="${bildUrl}" alt="Türchen ${nummer}" class="tuerchen-bild">
                </div>
            `;
        } else {
            // Einspaltig ohne Bild
            modalInhalt.classList.remove('mit-bild');
            modalText.innerHTML = textInhalt;
        }
        
        // Navigationsbuttons aktualisieren
        navPrev.style.display = (nummer > 1) ? 'flex' : 'none';
        navNext.style.display = (nummer < 24) ? 'flex' : 'none';
        
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
