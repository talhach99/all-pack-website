// Shot list: each returns { objects, opts } for the engine.
import { cove, gobo } from './engine.js';
import { P } from './products.js';
import { place } from './geo.js';

export const SET = { stone: '#E4DED3', sand: '#E2D3BE', sage: '#C8CEBC', blush: '#E6D2CB', mist: '#D8DDE3', ink: '#232A3B', clay: '#D2B39C', cream: '#EEE8DC' };
const V = (dir = [.62, .48, 1], fill = .82, lift = .42) => ({ dir, fill, lift });
// catalogue shot: product on a seamless sweep, gentle 3/4 view
const cat = (build, { set = SET.stone, view = V(), key, frames = 72, aperture = 0, fov = 24, goboOn = false, extra = {} } = {}) => async () => ({
  objects: [cove({ color: set }), ...(goboOn ? [gobo({})] : []), ...[].concat(build())],
  opts: { frames, fov, view, aperture, ...(key ? { key } : {}), ...extra },
});

export const SHOTS = {
  shipping: cat(() => place(P.shipping(), 0, 0, 0, -.5)),
  mailer: cat(() => place(P.mailer(), 0, 0, 0, -.35), { view: V([.5, .75, 1], .78, .3) }),
  gift: cat(() => P.gift(), { set: SET.sand, view: V([.4, .55, 1], .8, .35) }),
  carton: cat(() => P.cartons(), { set: SET.blush, view: V([.35, .4, 1], .8, .45) }),
  printed: cat(() => P.printed(), { set: SET.mist, view: V([.55, .5, 1], .6, .4) }),
  bottle: cat(() => P.bottle(), { set: SET.sand, view: V([.25, .32, 1], .78, .45) }),
  pizza: cat(() => place(P.pizza(), 0, 0, 0, -.4), { view: V([.55, .6, 1], .8, .4) }),
  burger: cat(() => P.burger(), { set: SET.sand, view: V([.4, .6, 1], .8, .35) }),
  cake: cat(() => place(P.cake(), 0, 0, 0, -.35), { set: SET.blush, view: V([.45, .75, 1], .78, .4) }),
  takeaway: cat(() => P.takeaway(), { set: SET.clay, view: V([.35, .38, 1], .8, .45) }),
  cup: cat(() => P.cup(), { set: SET.sand, view: V([.3, .35, 1], .78, .45) }),
  bag: cat(() => P.bag(), { set: SET.stone, view: V([.35, .3, 1], .8, .48) }),
  mailerbag: cat(() => P.mailerbag(), { set: SET.mist, view: V([.4, .95, 1], .8, .3) }),
  pouch: cat(() => P.pouch(), { set: SET.cream, view: V([.3, .32, 1], .8, .46) }),
  roll: cat(() => P.roll(), { set: SET.mist, view: V([.45, .5, 1], .82, .4) }),
  tape: cat(() => P.tape(), { set: SET.stone, view: V([.45, .75, 1], .8, .35) }),
  label: cat(() => P.label(), { set: SET.cream, view: V([.35, .85, 1], .8, .3) }),
  tissue: cat(() => P.tissue(), { set: SET.blush, view: V([.3, .9, 1], .78, .3) }),
  produce: cat(() => P.produce(), { set: SET.sage, view: V([.4, .7, 1], .8, .35) }),
  jewellery: cat(() => P.jewellery(), { set: SET.ink, view: V([.35, .5, 1], .8, .4), extra: { bounceColor: '#2a2f3c', vignette: .25 } }),
  shoe: cat(() => P.shoe(), { set: SET.stone, view: V([.45, .6, 1], .82, .4) }),
  cargo: cat(() => P.cargo(), { set: SET.stone, view: V([.6, .45, 1], .82, .42) }),
  hero: cat(() => P.hero(), { set: SET.cream, view: { dir: [.2, .3, 1], fill: .74, lift: .36, pan: .46 }, goboOn: false, frames: 110, extra: { w: 2400, h: 1200, fov: 22, key: { dir: [-.75, .7, .35], spread: .1, intensity: 3.4, color: '#fff3e2' } } }),
  ind_ecommerce: cat(() => P.ind_ecommerce(), { set: SET.stone, view: V([.35, .55, 1], .7, .35) }),
  ind_restaurants: cat(() => P.ind_restaurants(), { set: SET.sand, view: V([.35, .6, 1], .7, .35) }),
  ind_bakeries: cat(() => P.ind_bakeries(), { set: SET.blush, view: V([.3, .45, 1], .72, .4) }),
  ind_cafes: cat(() => P.ind_cafes(), { set: SET.sand, view: V([.25, .35, 1], .72, .42) }),
  ind_beauty: cat(() => P.ind_beauty(), { set: SET.blush, view: V([.3, .38, 1], .72, .42) }),
  ind_fashion: cat(() => P.ind_fashion(), { set: SET.stone, view: V([.35, .5, 1], .72, .4) }),
  ind_jewellery: cat(() => P.ind_jewellery(), { set: SET.ink, view: V([.3, .5, 1], .72, .38), extra: { bounceColor: '#2a2f3c', vignette: .25 } }),
  ind_pharma: cat(() => P.ind_pharma(), { set: SET.mist, view: V([.35, .5, 1], .72, .38) }),
  ind_agriculture: cat(() => P.ind_agriculture(), { set: SET.sage, view: V([.35, .55, 1], .7, .35) }),
  // finish close-ups (macro, shallow depth of field)
  fin_foil: async () => ({ objects: [cove({ color: SET.sand }), place(P.rigid({ w: 3.0, h: 1.2, d: 3.0, lidH: .45 }), 0, 0, 0, .3)], opts: { frames: 96, fov: 18, camPos: [1.3, 3.2, 3.4], target: [-.25, 1.3, .1], aperture: .07, focus: 3.7 } }),
  fin_soft: async () => ({ objects: [cove({ color: SET.stone }), place(P.mailerClosed({}), 0, 0, 0, -.4)], opts: { frames: 96, fov: 18, camPos: [2.6, 2.1, 3.6], target: [.4, .8, .6], aperture: .08 } }),
  fin_kraft: async () => ({ objects: [cove({ color: SET.stone }), place(P.shipping(), 0, 0, 0, -.5)], opts: { frames: 96, fov: 20, camPos: [4.2, 4.6, 7.0], target: [.2, 2.2, .9], aperture: .045 } }),
  fin_print: async () => ({ objects: [cove({ color: SET.mist }), place(P.printed(), 0, 0, 0, 0)], opts: { frames: 96, fov: 16, camPos: [2.4, 3.2, 5.2], target: [0, 1.6, .4], aperture: .09 } }),
};
