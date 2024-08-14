import type {TuiLanguageKit} from '@taiga-ui/i18n/types';

export const TUI_GERMAN_LANGUAGE_KIT: TuiLanguageKit = {
    cancel: 'Abbrechen',
    done: 'Fertig',
    more: 'Mehr',
    otherDate: 'Anderes Datum...',
    showAll: 'Show all',
    hide: 'Hide',
    mobileCalendarTexts: ['Tag auswählen', 'Zeitraum auswählen', 'Wählen Sie Tage'],
    range: ['von', 'bis'],
    countTexts: ['Plus', 'Minus'],
    time: {
        'HH:MM': 'HH:MM',
        'HH:MM:SS': 'HH:MM:SS',
        'HH:MM:SS.MSS': 'HH:MM:SS.MSS',
    },
    dateTexts: {
        DMY: 'dd.mm.yyyy',
        MDY: 'mm.dd.yyyy',
        YMD: 'yyyy.mm.dd',
    },
    digitalInformationUnits: ['B', 'KiB', 'MiB'],
    passwordTexts: ['Passwort anzeigen', 'Passwort ausblenden'],
    copyTexts: ['Kopieren', 'Kopiert'],
    shortCalendarMonths: [
        'Jan',
        'Feb',
        'Mär',
        'Apr',
        'Mai',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Okt',
        'Nov',
        'Dez',
    ],
    pagination: ['Vorherige Seite', 'Nächste Seite'],
    fileTexts: {
        loadingError: 'Fehler beim Laden',
        preview: 'Vorschau',
        remove: 'Entfernen',
    },
    inputFileTexts: {
        defaultLabelSingle: 'oder einzelne Datei hier ablegen',
        defaultLabelMultiple: 'oder mehrere Dateien hier ablegen',
        defaultLinkSingle: 'Datei auswählen',
        defaultLinkMultiple: 'Dateien auswählen',
        maxSizeRejectionReason:
            'Die Dateigröße überschreitet die maximal zulässige Größe von',
        formatRejectionReason: 'Ungültiges Dateiformat',
        drop: 'Datei hier ablegen',
        dropMultiple: 'Dateien hier ablegen',
    },
    multiSelectTexts: {
        all: 'Alles auswählen',
        none: 'Keine auswählen',
    },
    confirm: {
        yes: 'Ja',
        no: 'Nein',
    },
    previewTexts: {
        rotate: 'Rotieren',
    },
    zoomTexts: {
        zoomOut: 'Verkleinern',
        zoomIn: 'Vergrößern',
        reset: 'Zurücksetzen',
    },
};
