import {Xt} from 'xtend-library'
import {Ajax} from 'xtend-library/src/components/ajax/ajax'
import {Smooth} from 'xtend-library/src/components/smooth/smooth'
import {Scroll} from 'xtend-library/src/components/scroll/scroll'
import {Overlay} from 'xtend-library/src/components/overlay/overlay'

import {TweenMax} from 'gsap/TweenMax'

/**
 * Xt
 */

Xt.ready(Xt.load)

/**
 * ajax
 */

Xt.observe.push({
  matches: 'html',
  fnc: function (main, index, query) {

    let self = new Ajax(main, {
      "query": ".site_wrapper",
    });

    // destroy

    return function destroy() {
      self.destroy();
      self = null;
    };

  }
});

/**
 * smooth
 */

Xt.observe.push({
  matches: 'html',
  fnc: function (main, index, query) {

    let self = new Smooth(document.scrollingElement, {});

    // destroy

    return function destroy() {
      self.destroy();
      self = null;
    };

  }
});

/**
 * .header
 */

Xt.observe.push({
  matches: '.header',
  fnc: function (main, index, query) {

    let parallax = main;

    let self = new Scroll(parallax, {
      "sticky": "fixed",
      "end": 350
    });

    // event

    for (let el of self.elements) {

      el.addEventListener('change.xt.scroll', function (e) {
        TweenMax.set(el, {opacity: self.detail.ratioInverse});
      });

    }

    // external event test

    let externalEvent = function() {
      console.log(self.object);
    }
    window.addEventListener('scroll', externalEvent);

    // destroy

    return function destroy() {
      self.destroy();
      self = null;
      // external events
      window.removeEventListener('scroll', externalEvent);
    };

  }
});

/**
 * .footer
 */

Xt.observe.push({
  matches: '.footer',
  fnc: function (main, index, query) {

    let parallax = main;

    let self = new Scroll(parallax, {
      "sticky": true,
      "start": "125%"
    });

    // event

    for (let el of self.elements) {

      el.addEventListener('change.xt.scroll', function (e) {
        TweenMax.set(el, {opacity: self.detail.ratio});
      });

    }

    // destroy

    return function destroy() {
      self.destroy();
      self = null;
    };

  }
});
