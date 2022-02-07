/*
    Cookie Consent Notice Type a
    Adapted from https://github.com/manucaralmo/GlowCookies
*/

class CookieConsentNotice {
  constructor() {
    // Cookies banner
    this.banner = undefined
    // Config
    this.config = undefined
    this.tracking = undefined
    // DOM ELEMENTS
    this.PreBanner = undefined
    this.Cookies = undefined
    this.DOMbanner = undefined
  }

  render() {
    this.addCss()
    this.createDOMElements()
    this.checkStatus()
  }

  addCss() {
    const stylesheet = document.createElement('link');
    stylesheet.setAttribute('rel', 'stylesheet');
    stylesheet.setAttribute('href', 'ccn-type-c.css');
    document.head.appendChild(stylesheet);
  }

  createDOMElements() {
    // COOKIES BUTTON
    this.PreBanner = document.createElement("div");
    this.PreBanner.innerHTML = `<button type="button" id="prebannerBtn" class="prebanner prebanner__border__${this.config.bannerStyle} cookieConsentNotice__${this.config.position} cookieConsentNotice__${this.config.border} animation" style="color: ${this.banner.manageCookies.color}; background-color: ${this.banner.manageCookies.background};">
                                      <svg fill="currentColor" style="margin-right: 7px; margin-top: 2px; vertical-align: text-top;" height="15px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                          <path d="M510.52 255.82c-69.97-.85-126.47-57.69-126.47-127.86-70.17 0-127-56.49-127.86-126.45-27.26-4.14-55.13.3-79.72 12.82l-69.13 35.22a132.221 132.221 0 0 0-57.79 57.81l-35.1 68.88a132.645 132.645 0 0 0-12.82 80.95l12.08 76.27a132.521 132.521 0 0 0 37.16 72.96l54.77 54.76a132.036 132.036 0 0 0 72.71 37.06l76.71 12.15c27.51 4.36 55.7-.11 80.53-12.76l69.13-35.21a132.273 132.273 0 0 0 57.79-57.81l35.1-68.88c12.56-24.64 17.01-52.58 12.91-79.91zM176 368c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm32-160c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm160 128c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"/>
                                      </svg>${this.banner.manageCookies.text}</button>`;
    this.PreBanner.style.display = "none";
    document.body.appendChild(this.PreBanner);

    // COOKIES BANNER
    this.Cookies = document.createElement("div");
    this.Cookies.innerHTML = `<div 
                                      id="cookieConsentNotice-banner" 
                                      class="cookieConsentNotice__banner cookieConsentNotice__banner__${this.config.bannerStyle} cookieConsentNotice__${this.config.border} cookieConsentNotice__${this.config.position}"
                                      style="background-color: ${this.banner.background};"
                                  >
                                      <h3 id="heading" style="color: ${this.banner.color};">${this.banner.heading}</h3>
                                      <p id="description" style="color: ${this.banner.color};">
                                          ${this.banner.description} 
                                          <a 
                                              href="${this.banner.link}"
                                              target="_blank" 
                                              class="read__more"
                                              style="color: ${this.banner.color};"
                                          >
                                              ${this.banner.linkText}
                                          </a>
                                      </p>
                                      <div class="chkbox__section">
                                      <!-- JavaScript dummy checkboxes go here -->
                                      </div>
                                      <div class="btn__section">
                                          <button type="button" id="acceptCookies" class="btn__accept accept__btn__styles" style="color: ${this.banner.acceptBtn.color}; background-color: ${this.banner.acceptBtn.background};">
                                              ${this.banner.acceptBtn.text}
                                          </button>
                                          <button type="button" id="settingsCookies" class="btn__settings settings__btn__styles" style="color: ${this.banner.settingsBtn.color}; border: ${this.banner.settingsBtn.border}; background-color: ${this.banner.settingsBtn.background};">
                                              ${this.banner.settingsBtn.text}
                                          </button>
                                          <button type="button" id="rejectCookies" class="btn__settings settings__btn__styles" style="color: ${this.banner.rejectBtn.color}; background-color: ${this.banner.rejectBtn.background};">
                                              ${this.banner.rejectBtn.text}
                                          </button>
                                      </div>
                                  </div>
                              `;
    document.body.appendChild(this.Cookies);
    this.DOMbanner = document.getElementById('cookieConsentNotice-banner')


    // SET EVENT LISTENERS
    document.getElementById('prebannerBtn').addEventListener('click', () => this.openSelector())
    document.getElementById('acceptCookies').addEventListener('click', () => this.acceptCookies())
    document.getElementById('settingsCookies').addEventListener('click', () => this.openSettings())
    document.getElementById('rejectCookies').addEventListener('click', () => this.rejectCookies())
  }

  checkStatus() {
    switch (localStorage.getItem("CookieConsentNotice")) {
      case "1":
        this.openManageCookies();
        this.activateTracking();
        this.addCustomScript();
        break;
      case "0":
        this.openManageCookies();
        break;
      default:
        this.openSelector();
    }
  }

  openManageCookies() {
    this.PreBanner.style.display = this.config.hideAfterClick ? "none" : "block"
    this.DOMbanner.classList.remove('cookieConsentNotice__show')
  }

  openSelector() {
    this.PreBanner.style.display = "none";
    this.DOMbanner.classList.add('cookieConsentNotice__show')
  }

  openSettings(){document.getElementById("description").innerHTML = "Please select the type of cookies we are allowed to use.";
    document.getElementById("heading").innerHTML = "Cookie Settings";
    document.getElementById("description").innerHTML = "Please select the type of cookies we are allowed to use.";
    document.getElementById("acceptCookies").innerHTML = "Accept All";
    document.getElementById("acceptCookies").style.width = "48%";
    document.getElementById("settingsCookies").style.display = "none";
    document.getElementById("rejectCookies").innerHTML = "Save & Close";
    document.getElementById("rejectCookies").style.width = "48%";
    document.getElementsByClassName('chkbox__section')[0].innerHTML = `<label class="container">Neccesary
    <input type="checkbox" checked="checked">
    <span class="checkmark"></span>
    </label>            
    <label class="container">Personalisation & Design
    <input type="checkbox">
    <span class="checkmark"></span>
    </label>
    <label class="container">Analytics
    <input type="checkbox">
    <span class="checkmark"></span>
    </label>
    <label class="container">Social Media
    <input type="checkbox">
    <span class="checkmark"></span>
    </label>
    <label class="container">Marketing
    <input type="checkbox">
    <span class="checkmark"></span>
    </label>`;
}


  acceptCookies() {
    localStorage.setItem("CookieConsentNotice", "1")
    this.openManageCookies()
    this.activateTracking()
    this.addCustomScript()
  }

  rejectCookies() {
    localStorage.setItem("CookieConsentNotice", "0");
    this.openManageCookies();
    this.disableTracking();
  }

  activateTracking() {
    // Google Analytics Tracking
    if (this.tracking.AnalyticsCode) {
      let Analytics = document.createElement('script');
      Analytics.setAttribute('src', `https://www.googletagmanager.com/gtag/js?id=${this.tracking.AnalyticsCode}`);
      document.head.appendChild(Analytics);
      let AnalyticsData = document.createElement('script');
      AnalyticsData.text = `window.dataLayer = window.dataLayer || [];
                                  function gtag(){dataLayer.push(arguments);}
                                  gtag('js', new Date());
                                  gtag('config', '${this.tracking.AnalyticsCode}');`;
      document.head.appendChild(AnalyticsData);
    }

    // Facebook pixel tracking code
    if (this.tracking.FacebookPixelCode) {
      let FacebookPixelData = document.createElement('script');
      FacebookPixelData.text = `
                                      !function(f,b,e,v,n,t,s)
                                      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                                      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                                      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                                      n.queue=[];t=b.createElement(e);t.async=!0;
                                      t.src=v;s=b.getElementsByTagName(e)[0];
                                      s.parentNode.insertBefore(t,s)}(window, document,'script',
                                      'https://connect.facebook.net/en_US/fbevents.js');
                                      fbq('init', '${this.tracking.FacebookPixelCode}');
                                      fbq('track', 'PageView');
                                  `;
      document.head.appendChild(FacebookPixelData);
      let FacebookPixel = document.createElement('noscript');
      FacebookPixel.setAttribute('height', `1`);
      FacebookPixel.setAttribute('width', `1`);
      FacebookPixel.setAttribute('style', `display:none`);
      FacebookPixel.setAttribute('src', `https://www.facebook.com/tr?id=${this.tracking.FacebookPixelCode}&ev=PageView&noscript=1`);
      document.head.appendChild(FacebookPixel);
    }

    // Hotjar Tracking
    if (this.tracking.HotjarTrackingCode) {
      let hotjarTrackingData = document.createElement('script');
      hotjarTrackingData.text = `
                                  (function(h,o,t,j,a,r){
                                      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                                      h._hjSettings={hjid:${this.tracking.HotjarTrackingCode},hjsv:6};
                                      a=o.getElementsByTagName('head')[0];
                                      r=o.createElement('script');r.async=1;
                                      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                                      a.appendChild(r);
                                  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
                                  `;
      document.head.appendChild(hotjarTrackingData);
    }
  }

  disableTracking() {
    // Google Analytics Tracking ('client_storage': 'none')
    if (this.tracking.AnalyticsCode) {
      let Analytics = document.createElement('script');
      Analytics.setAttribute('src', `https://www.googletagmanager.com/gtag/js?id=${this.tracking.AnalyticsCode}`);
      document.head.appendChild(Analytics);
      let AnalyticsData = document.createElement('script');
      AnalyticsData.text = `window.dataLayer = window.dataLayer || [];
                          function gtag(){dataLayer.push(arguments);}
                          gtag('js', new Date());
                          gtag('config', '${this.tracking.AnalyticsCode}' , {
                              'client_storage': 'none',
                              'anonymize_ip': true
                          });`;
      document.head.appendChild(AnalyticsData);
    }

    // Clear cookies - not working 100%
    this.clearCookies()
  }

  clearCookies() {
    let cookies = document.cookie.split("; ");
    for (let c = 0; c < cookies.length; c++) {
      let d = window.location.hostname.split(".");
      while (d.length > 0) {
        let cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
        let p = location.pathname.split('/');
        document.cookie = cookieBase + '/';
        while (p.length > 0) {
          document.cookie = cookieBase + p.join('/');
          p.pop();
        };
        d.shift();
      }
    }
  }

  addCustomScript() {
    if (this.tracking.customScript !== undefined) {
      let customScriptTag

      this.tracking.customScript.forEach(script => {
        if (script.type === 'src') {
          customScriptTag = document.createElement('script');
          customScriptTag.setAttribute('src', script.content);
        } else if (script.type === 'custom') {
          customScriptTag = document.createElement('script');
          customScriptTag.text = script.content;
        }

        if (script.position === 'head') {
          document.head.appendChild(customScriptTag);
        } else {
          document.body.appendChild(customScriptTag);
        }
      })
    }
  }

  start(languaje, obj) {
    if (!obj) obj = {}
    const lang = new LanguagesGC(languaje)

    this.config = {
      border: obj.border || 'border',
      position: obj.position || 'left',
      hideAfterClick: obj.hideAfterClick || false,
      bannerStyle: obj.style || 'basic'
    }

    this.tracking = {
      AnalyticsCode: obj.analytics || undefined,
      FacebookPixelCode: obj.facebookPixel || undefined,
      HotjarTrackingCode: obj.hotjar || undefined,
      customScript: obj.customScript || undefined
    }

    this.banner = {
      description: obj.bannerDescription || lang.bannerDescription,
      linkText: obj.bannerLinkText || lang.bannerLinkText,
      link: obj.policyLink || '#link',
      background: obj.bannerBackground || '#fff',
      color: obj.bannerColor || '#4a4a4a',
      heading: obj.bannerHeading !== 'none' ? obj.bannerHeading || lang.bannerHeading : '',
      acceptBtn: {
        text: obj.acceptBtnText || lang.acceptBtnText,
        background: obj.acceptBtnBackground || '#209cee',
        color: obj.acceptBtnColor || '#fff'
      },
      settingsBtn: {
        text: obj.settingsBtnText || lang.settingsBtnText,
        background: obj.settingsBtnBackground || '#eeeeee',
        color: obj.settingsBtnColor || '#4a4a4a',
        border: obj.settingsBtnBorder || '2px solid #4a4a4a'
      },
      rejectBtn: {
        text: obj.rejectBtnText || lang.rejectBtnText,
        background: obj.rejectBtnBackground || '#eeeeee',
        color: obj.rejectBtnColor || '#4a4a4a'
      },
      manageCookies: {
        color: obj.manageColor || '#4a4a4a',
        background: obj.manageBackground || '#fff',
        text: obj.manageText || lang.manageText,
      }
    }

    // Draw banner
    window.addEventListener('load', () => { this.render() })
  }
}

class LanguagesGC {
  constructor(code) {
    this.init()
    let lang = this.arrLang[code] || this.arrLang['en']
    this.bannerHeading = lang['bannerHeading']
    this.bannerDescription = lang['bannerDescription']
    this.bannerLinkText = lang['bannerLinkText']
    this.acceptBtnText = lang['acceptBtnText']
    this.settingsBtnText = lang['settingsBtnText']
    this.rejectBtnText = lang['rejectBtnText']
    this.manageText = lang['manageText']
  }

  init() {
    this.arrLang = {
      af: {
        'bannerHeading': 'Ons gebruik koekies',
        'bannerDescription': 'Ons gebruik ons eie koekies en die van derdepartye, om inhoud te verpersoonlik en om webverkeer te ontleed.',
        'bannerLinkText': 'Lees meer oor koekies',
        'acceptBtnText': 'Aanvaar koekies',
        'settingsBtnText': 'Instellings vir koekies',
        'rejectBtnText': 'Weier',
        'manageText': 'Koekie-instellings'
      },
      en: {
        'bannerHeading': 'We use cookies',
        'bannerDescription': 'We use our own and third-party cookies to personalize content and to analyze web traffic.',
        'bannerLinkText': 'Read more about cookies',
        'acceptBtnText': 'Accept cookies',
        'settingsBtnText': 'Cookie settings',
        'rejectBtnText': 'Reject',
        'manageText': 'Manage cookies'
      }
    }
  }

}

const cookieConsentNotice = new CookieConsentNotice()
