/*!
 * vue-gettext v0.0.2
 * (c) 2016 Polyconseil
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
  typeof define === 'function' && define.amd ? define(['vue'], factory) :
  (global.VueGettext = factory(global.Vue));
}(this, function (Vue) { 'use strict';

  Vue = 'default' in Vue ? Vue['default'] : Vue;

  function Config (Vue, languageVm) {

    /*
     * Adds a `language` property to `Vue.config` and makes it reactive:
     * Vue.config.language = 'fr_FR'
     */
    Object.defineProperty(Vue.config, 'language', {
      enumerable: true,
      configurable: true,
      get: function get() {
        return languageVm.current;
      },
      set: function set(val) {
        languageVm.current = val;
      }
    });
  }

  /**
   * Plural Forms
   *
   * This is a list of the plural forms, as used by Gettext PO, that are appropriate to each language.
   * http://docs.translatehouse.org/projects/localization-guide/en/latest/l10n/pluralforms.html
   *
   * This is a replica of angular-gettext's plural.js
   * https://github.com/rubenv/angular-gettext/blob/master/src/plural.js
   */
  var plurals = {

    getTranslationIndex: function getTranslationIndex(languageCode, n) {

      n = Number.isNaN(parseInt(n)) ? 1 : parseInt(n); // Fallback to singular.

      // Extract the ISO 639 two-letter language code since this function
      // is mostly based on two-letter codes, see:
      // https://www.gnu.org/savannah-checkouts/gnu/gettext/manual/html_node/Locale-Names.html
      if (languageCode.length > 2 && languageCode !== 'pt_BR') {
        languageCode = languageCode.substring(0, 2);
      }

      switch (languageCode) {
        case 'ay': // Aymará
        case 'bo': // Tibetan
        case 'cgg': // Chiga
        case 'dz': // Dzongkha
        case 'fa': // Persian
        case 'id': // Indonesian
        case 'ja': // Japanese
        case 'jbo': // Lojban
        case 'ka': // Georgian
        case 'kk': // Kazakh
        case 'km': // Khmer
        case 'ko': // Korean
        case 'ky': // Kyrgyz
        case 'lo': // Lao
        case 'ms': // Malay
        case 'my': // Burmese
        case 'sah': // Yakut
        case 'su': // Sundanese
        case 'th': // Thai
        case 'tt': // Tatar
        case 'ug': // Uyghur
        case 'vi': // Vietnamese
        case 'wo': // Wolof
        case 'zh':
          // Chinese
          // 1 form
          return 0;
        case 'is':
          // Icelandic
          // 2 forms
          return n % 10 !== 1 || n % 100 === 11 ? 1 : 0;
        case 'jv':
          // Javanese
          // 2 forms
          return n !== 0 ? 1 : 0;
        case 'mk':
          // Macedonian
          // 2 forms
          return n === 1 || n % 10 === 1 ? 0 : 1;
        case 'ach': // Acholi
        case 'ak': // Akan
        case 'am': // Amharic
        case 'arn': // Mapudungun
        case 'br': // Breton
        case 'fil': // Filipino
        case 'fr': // French
        case 'gun': // Gun
        case 'ln': // Lingala
        case 'mfe': // Mauritian Creole
        case 'mg': // Malagasy
        case 'mi': // Maori
        case 'oc': // Occitan
        case 'pt_BR': // Brazilian Portuguese
        case 'tg': // Tajik
        case 'ti': // Tigrinya
        case 'tr': // Turkish
        case 'uz': // Uzbek
        case 'wa': // Walloon
        /* eslint-disable */
        /* Disable "Duplicate case label" because there are 2 forms of Chinese plurals */
        case 'zh':
          // Chinese
          /* eslint-enable */
          // 2 forms
          return n > 1 ? 1 : 0;
        case 'lv':
          // Latvian
          // 3 forms
          return n % 10 === 1 && n % 100 !== 11 ? 0 : n !== 0 ? 1 : 2;
        case 'lt':
          // Lithuanian
          // 3 forms
          return n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
        case 'be': // Belarusian
        case 'bs': // Bosnian
        case 'hr': // Croatian
        case 'ru': // Russian
        case 'sr': // Serbian
        case 'uk':
          // Ukrainian
          // 3 forms
          return n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
        case 'mnk':
          // Mandinka
          // 3 forms
          return n === 0 ? 0 : n === 1 ? 1 : 2;
        case 'ro':
          // Romanian
          // 3 forms
          return n === 1 ? 0 : n === 0 || n % 100 > 0 && n % 100 < 20 ? 1 : 2;
        case 'pl':
          // Polish
          // 3 forms
          return n === 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
        case 'cs': // Czech
        case 'sk':
          // Slovak
          // 3 forms
          return n === 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2;
        case 'csb':
          // Kashubian
          // 3 forms
          return n === 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
        case 'sl':
          // Slovenian
          // 4 forms
          return n % 100 === 1 ? 1 : n % 100 === 2 ? 2 : n % 100 === 3 || n % 100 === 4 ? 3 : 0;
        case 'mt':
          // Maltese
          // 4 forms
          return n === 1 ? 0 : n === 0 || n % 100 > 1 && n % 100 < 11 ? 1 : n % 100 > 10 && n % 100 < 20 ? 2 : 3;
        case 'gd':
          // Scottish Gaelic
          // 4 forms
          return n === 1 || n === 11 ? 0 : n === 2 || n === 12 ? 1 : n > 2 && n < 20 ? 2 : 3;
        case 'cy':
          // Welsh
          // 4 forms
          return n === 1 ? 0 : n === 2 ? 1 : n !== 8 && n !== 11 ? 2 : 3;
        case 'kw':
          // Cornish
          // 4 forms
          return n === 1 ? 0 : n === 2 ? 1 : n === 3 ? 2 : 3;
        case 'ga':
          // Irish
          // 5 forms
          return n === 1 ? 0 : n === 2 ? 1 : n > 2 && n < 7 ? 2 : n > 6 && n < 11 ? 3 : 4;
        case 'ar':
          // Arabic
          // 6 forms
          return n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5;
        default:
          // Everything else
          return n !== 1 ? 1 : 0;
      }
    }

  };

  var translate = {

    /**
     * Get the translated string from the translation.json file generated by easygettext.
     *
     * @param {String} msgid - The translation key
     * @param {Number} n - The number to switch between singular and plural
     * @param {String} context - The translation key context
     * @param {String} language - The language ID (e.g. 'fr_FR' or 'en_US')
     *
     * @return {String} The translated string
     */
    getTranslation: function getTranslation(msgid) {
      var n = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
      var context = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
      var language = arguments.length <= 3 || arguments[3] === undefined ? Vue.config.language : arguments[3];

      if (!msgid) {
        return ''; // Allow empty strings.
      }
      var translations = Vue.$translations[language];
      if (!translations) {
        console.warn('No translations found for ' + language);
        return msgid; // Returns the untranslated string.
      }
      var translated = translations[msgid];
      if (!translated) {
        console.warn('Untranslated ' + language + ' key found:\n' + msgid);
        return msgid; // Returns the untranslated string.
      }
      if (context) {
        translated = translated[context];
      }
      if (typeof translated === 'string') {
        translated = [translated];
      }
      return translated[plurals.getTranslationIndex(language, n)];
    },

    /**
     * Returns a string of the translation of the message.
     * Also makes the string discoverable by xgettext.
     *
     * @param {String} msgid - The translation key
     *
     * @return {String} The translated string
     */
    'gettext': function gettext(msgid) {
      return this.getTranslation(msgid);
    },

    /**
     * Returns a string of the translation for the given context.
     * Also makes the string discoverable by xgettext.
     *
     * @param {String} context - The context of the string to translate
     * @param {String} msgid - The translation key
     *
     * @return {String} The translated string
     */
    'pgettext': function pgettext(context, msgid) {
      return this.getTranslation(msgid, 1, context);
    },

    /**
     * Returns a string of the translation of either the singular or plural,
     * based on the number.
     * Also makes the string discoverable by xgettext.
     *
     * @param {String} msgid - The translation key
     * @param {String} plural - The plural form of the translation key
     * @param {Number} n - The number to switch between singular and plural
     *
     * @return {String} The translated string
     */
    'ngettext': function ngettext(msgid, plural, n) {
      return this.getTranslation(msgid, n);
    },

    /**
     * Returns a string of the translation of either the singular or plural,
     * based on the number, for the given context.
     * Also makes the string discoverable by xgettext.
     *
     * @param {String} context - The context of the string to translate
     * @param {String} msgid - The translation key
     * @param {String} plural - The plural form of the translation key
     * @param {Number} n - The number to switch between singular and plural
     *
     * @return {String} The translated string
     */
    'npgettext': function npgettext(context, msgid, plural, n) {
      return this.getTranslation(msgid, n, context);
    }

  };

  /**
   * Translate the component content according to the current language
   *
   * Built to work with easygettext https://github.com/Polyconseil/easygettext
   *
   * Usage:
   *
   *   Singular:
   *   <get-text>Foo</get-text>
   *
   *   Interpolation support:
   *   <get-text>Hello {{ name }}</get-text>
   *
   *   Plurals:
   *   <get-text :translate-n="count" translate-plural="{{ count }} cars">{{ count }} car</get-text>
   *
   *   Context:
   *   <get-text translate-context="Verb">Foo</get-text>
   *
   *   Comment:
   *   <get-text translate-comment="My comment for translators">Foo</get-text>
   */
  var GetTextComponent = {
    name: 'get-text',
    created: function created() {
      this.msgid = this.$options.el.innerHTML.trim(); // Stores the raw uninterpolated string to translate.
      this.isPlural = this.translateN !== undefined && this.translatePlural !== undefined;
      if (!this.isPlural && (this.translateN || this.translatePlural)) {
        throw new Error('`translate-n` and `translate-plural` attributes must be used together: ' + this.msgid + '.');
      }
    },
    props: [
    // Always use v-bind for dynamically binding the `translateN` prop to data on the parent,
    // i.e.: `:translate-n`
    'translateN', 'translatePlural', 'translateContext', 'translateComment'],
    computed: {
      translation: function translation() {
        var n = this.isPlural ? this.translateN : 1;
        var translation = translate.getTranslation(this.msgid, n, this.translateContext, this.$language.current);
        return this.$parent.$interpolate(translation);
      }
    },
    template: '{{ translation }}'
  };

  function Override (Vue, languageVm) {

    // Override the main init sequence. This is called for every instance.
    var init = Vue.prototype._init;
    Vue.prototype._init = function () {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var root = options._parent || options.parent || this;
      // Expose languageVm to every instance.
      this.$language = root.$language || languageVm;
      init.call(this, options);
    };

    // Override the main destroy sequence to destroy all languageVm watchers.
    var destroy = Vue.prototype._destroy;
    Vue.prototype._destroy = function () {
      this.$language = null;
      destroy.apply(this, arguments);
    };
  }

  var defaultConfig = {
    availableLanguages: { en_US: 'English' },
    defaultLanguage: 'en',
    languageVmMixin: {},
    translations: null
  };

  var languageVm = void 0; // Singleton.

  function index (Vue) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];


    Object.keys(options).forEach(function (key) {
      if (!(Object.keys(defaultConfig).indexOf(key) !== -1)) {
        throw new Error(key + ' is an invalid option for the translate plugin.');
      }
    });

    if (!options.translations) {
      throw new Error('No translations available.');
    }

    options = Object.assign(defaultConfig, options);

    // Makes translations available as a global property.
    Vue.$translations = options.translations;

    languageVm = new Vue({
      created: function created() {
        // Non-reactive data.
        this.available = options.availableLanguages;
      },
      data: {
        current: options.defaultLanguage
      },
      mixins: [options.languageVmMixin]
    });

    Override(Vue, languageVm);

    Config(Vue, languageVm);

    // Makes <get-text> available as a global component.
    Vue.component('get-text', GetTextComponent);

    Vue.prototype.$gettext = translate.gettext.bind(translate);
    Vue.prototype.$pgettext = translate.pgettext.bind(translate);
    Vue.prototype.$ngettext = translate.ngettext.bind(translate);
    Vue.prototype.$npgettext = translate.npgettext.bind(translate);
  }

  return index;

}));