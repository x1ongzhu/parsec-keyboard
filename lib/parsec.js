"use strict";
var h;
var counter = 0;
var resizeFlag = true;
function n(a) {
    var b = 0;
    return function () {
        return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
    };
}
function q(a) {
    var b =
        "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
    return b ? b.call(a) : { next: n(a) };
}
var r =
        "undefined" != typeof window && window === this
            ? this
            : "undefined" != typeof global && null != global
            ? global
            : this,
    u =
        "function" == typeof Object.defineProperties
            ? Object.defineProperty
            : function (a, b, d) {
                  a != Array.prototype &&
                      a != Object.prototype &&
                      (a[b] = d.value);
              };
function w(a, b) {
    if (b) {
        var d = r;
        a = a.split(".");
        for (var f = 0; f < a.length - 1; f++) {
            var g = a[f];
            g in d || (d[g] = {});
            d = d[g];
        }
        a = a[a.length - 1];
        f = d[a];
        b = b(f);
        b != f &&
            null != b &&
            u(d, a, { configurable: !0, writable: !0, value: b });
    }
}
w("Promise", function (a) {
    function b(c) {
        this.c = 0;
        this.h = void 0;
        this.b = [];
        var e = this.f();
        try {
            c(e.resolve, e.reject);
        } catch (k) {
            e.reject(k);
        }
    }
    function d() {
        this.b = null;
    }
    function f(c) {
        return c instanceof b
            ? c
            : new b(function (e) {
                  e(c);
              });
    }
    if (a) return a;
    d.prototype.c = function (c) {
        if (null == this.b) {
            this.b = [];
            var e = this;
            this.f(function () {
                e.h();
            });
        }
        this.b.push(c);
    };
    var g = r.setTimeout;
    d.prototype.f = function (c) {
        g(c, 0);
    };
    d.prototype.h = function () {
        for (; this.b && this.b.length; ) {
            var c = this.b;
            this.b = [];
            for (var e = 0; e < c.length; ++e) {
                var k = c[e];
                c[e] = null;
                try {
                    k();
                } catch (m) {
                    this.g(m);
                }
            }
        }
        this.b = null;
    };
    d.prototype.g = function (c) {
        this.f(function () {
            throw c;
        });
    };
    b.prototype.f = function () {
        function c(m) {
            return function (p) {
                k || ((k = !0), m.call(e, p));
            };
        }
        var e = this,
            k = !1;
        return { resolve: c(this.s), reject: c(this.g) };
    };
    b.prototype.s = function (c) {
        if (c === this)
            this.g(new TypeError("A Promise cannot resolve to itself"));
        else if (c instanceof b) this.u(c);
        else {
            a: switch (typeof c) {
                case "object":
                    var e = null != c;
                    break a;
                case "function":
                    e = !0;
                    break a;
                default:
                    e = !1;
            }
            e ? this.o(c) : this.i(c);
        }
    };
    b.prototype.o = function (c) {
        var e = void 0;
        try {
            e = c.then;
        } catch (k) {
            this.g(k);
            return;
        }
        "function" == typeof e ? this.v(e, c) : this.i(c);
    };
    b.prototype.g = function (c) {
        this.j(2, c);
    };
    b.prototype.i = function (c) {
        this.j(1, c);
    };
    b.prototype.j = function (c, e) {
        if (0 != this.c)
            throw Error(
                "Cannot settle(" +
                    c +
                    ", " +
                    e +
                    "): Promise already settled in state" +
                    this.c
            );
        this.c = c;
        this.h = e;
        this.l();
    };
    b.prototype.l = function () {
        if (null != this.b) {
            for (var c = 0; c < this.b.length; ++c) l.c(this.b[c]);
            this.b = null;
        }
    };
    var l = new d();
    b.prototype.u = function (c) {
        var e = this.f();
        c.w(e.resolve, e.reject);
    };
    b.prototype.v = function (c, e) {
        var k = this.f();
        try {
            c.call(e, k.resolve, k.reject);
        } catch (m) {
            k.reject(m);
        }
    };
    b.prototype.then = function (c, e) {
        function k(t, v) {
            return "function" == typeof t
                ? function (B) {
                      try {
                          m(t(B));
                      } catch (C) {
                          p(C);
                      }
                  }
                : v;
        }
        var m,
            p,
            D = new b(function (t, v) {
                m = t;
                p = v;
            });
        this.w(k(c, m), k(e, p));
        return D;
    };
    b.prototype.catch = function (c) {
        return this.then(void 0, c);
    };
    b.prototype.w = function (c, e) {
        function k() {
            switch (m.c) {
                case 1:
                    c(m.h);
                    break;
                case 2:
                    e(m.h);
                    break;
                default:
                    throw Error("Unexpected state: " + m.c);
            }
        }
        var m = this;
        null == this.b ? l.c(k) : this.b.push(k);
    };
    b.resolve = f;
    b.reject = function (c) {
        return new b(function (e, k) {
            k(c);
        });
    };
    b.race = function (c) {
        return new b(function (e, k) {
            for (var m = q(c), p = m.next(); !p.done; p = m.next())
                f(p.value).w(e, k);
        });
    };
    b.all = function (c) {
        var e = q(c),
            k = e.next();
        return k.done
            ? f([])
            : new b(function (m, p) {
                  function D(B) {
                      return function (C) {
                          t[B] = C;
                          v--;
                          0 == v && m(t);
                      };
                  }
                  var t = [],
                      v = 0;
                  do
                      t.push(void 0),
                          v++,
                          f(k.value).w(D(t.length - 1), p),
                          (k = e.next());
                  while (!k.done);
              });
    };
    return b;
});
function x() {
    x = function () {};
    r.Symbol || (r.Symbol = y);
}
function z(a, b) {
    this.b = a;
    u(this, "description", { configurable: !0, writable: !0, value: b });
}
z.prototype.toString = function () {
    return this.b;
};
var y = (function () {
    function a(d) {
        if (this instanceof a)
            throw new TypeError("Symbol is not a constructor");
        return new z("jscomp_symbol_" + (d || "") + "_" + b++, d);
    }
    var b = 0;
    return a;
})();
function A() {
    x();
    var a = r.Symbol.iterator;
    a || (a = r.Symbol.iterator = r.Symbol("Symbol.iterator"));
    "function" != typeof Array.prototype[a] &&
        u(Array.prototype, a, {
            configurable: !0,
            writable: !0,
            value: function () {
                return E(n(this));
            },
        });
    A = function () {};
}
function E(a) {
    A();
    a = { next: a };
    a[r.Symbol.iterator] = function () {
        return this;
    };
    return a;
}
function F() {
    this.g = !1;
    this.c = null;
    this.i = void 0;
    this.b = 1;
    this.l = this.h = 0;
    this.f = null;
}
function G(a) {
    if (a.g) throw new TypeError("Generator is already running");
    a.g = !0;
}
F.prototype.j = function (a) {
    this.i = a;
};
function H(a, b) {
    a.f = { F: b, Y: !0 };
    a.b = a.h || a.l;
}
F.prototype.return = function (a) {
    this.f = { return: a };
    this.b = this.l;
};
function I(a, b, d) {
    a.b = d;
    return { value: b };
}
function aa(a) {
    this.b = new F();
    this.c = a;
}
function ba(a, b) {
    G(a.b);
    var d = a.b.c;
    if (d)
        return J(
            a,
            "return" in d
                ? d["return"]
                : function (f) {
                      return { value: f, done: !0 };
                  },
            b,
            a.b.return
        );
    a.b.return(b);
    return K(a);
}
function J(a, b, d, f) {
    try {
        var g = b.call(a.b.c, d);
        if (!(g instanceof Object))
            throw new TypeError("Iterator result " + g + " is not an object");
        if (!g.done) return (a.b.g = !1), g;
        var l = g.value;
    } catch (c) {
        return (a.b.c = null), H(a.b, c), K(a);
    }
    a.b.c = null;
    f.call(a.b, l);
    return K(a);
}
function K(a) {
    for (; a.b.b; )
        try {
            var b = a.c(a.b);
            if (b) return (a.b.g = !1), { value: b.value, done: !1 };
        } catch (d) {
            (a.b.i = void 0), H(a.b, d);
        }
    a.b.g = !1;
    if (a.b.f) {
        b = a.b.f;
        a.b.f = null;
        if (b.Y) throw b.F;
        return { value: b.return, done: !0 };
    }
    return { value: void 0, done: !0 };
}
function ca(a) {
    this.next = function (b) {
        G(a.b);
        a.b.c ? (b = J(a, a.b.c.next, b, a.b.j)) : (a.b.j(b), (b = K(a)));
        return b;
    };
    this.throw = function (b) {
        G(a.b);
        a.b.c ? (b = J(a, a.b.c["throw"], b, a.b.j)) : (H(a.b, b), (b = K(a)));
        return b;
    };
    this.return = function (b) {
        return ba(a, b);
    };
    A();
    this[Symbol.iterator] = function () {
        return this;
    };
}
function da(a) {
    function b(f) {
        return a.next(f);
    }
    function d(f) {
        return a.throw(f);
    }
    return new Promise(function (f, g) {
        function l(c) {
            c.done
                ? f(c.value)
                : Promise.resolve(c.value).then(b, d).then(l, g);
        }
        l(a.next());
    });
}
function L(a) {
    return da(new ca(new aa(a)));
}
w("Object.entries", function (a) {
    return a
        ? a
        : function (b) {
              var d = [],
                  f;
              for (f in b)
                  Object.prototype.hasOwnProperty.call(b, f) &&
                      d.push([f, b[f]]);
              return d;
          };
});
var Status = {
    PARSEC_OK: 0,
    PARSEC_NOT_RUNNING: -3,
    PARSEC_CONNECTING: 20,
    PARSEC_WRN_BROWSER: 30,
};
function addEvtListener(element, eventName, listener) {
    element.addEventListener(eventName, listener);
    return [element, eventName, listener];
}
function O(a, b, d, f, g) {
    a = new DataView(a);
    a.setInt32(0, d);
    a.setInt32(4, f);
    a.setInt32(8, g);
    a.setInt8(12, b);
}
function P(a, b, d, f) {
    var g = new ArrayBuffer(13);
    O(g, a, b, d, f);
    return g;
}
function Q(a, b, d) {
    var f = new ArrayBuffer(13 + d.length + 1);
    O(f, a, d.length + 1, b, 0);
    a = new TextEncoder().encode(d);
    b = new Int8Array(f, 13);
    for (var g = 0; g < d.length; g++) b[g] = a[g];
    return f;
}
function ea(a, b) {
    a = JSON.stringify({
        _version: 1,
        _max_w: 6e4,
        _max_h: 6e4,
        _flags: 0,
        resolutionX: a,
        resolutionY: b,
        refreshRate: 60,
        mediaContainer: 0,
    });
    return Q(11, 0, a);
}
function fa(a, b, d, f, g) {
    switch (a.type) {
        case 4:
            if (!a.relative) {
                var l = Math.min(f / b, g / d),
                    c = b * l;
                l *= d;
                g = Math.max((g - l) / 2, 0);
                f = Math.round((b / c) * (a.x - Math.max((f - c) / 2, 0)));
                f === b - 1 && (f = b);
                f > b && (f = b);
                0 > f && (f = 0);
                a.x = f;
                b = Math.round((d / l) * (a.y - g));
                b === d - 1 && (b = d);
                b > d && (b = d);
                0 > b && (b = 0);
                a.y = b;
            }
            return P(3, a.relative ? 1 : 0, a.x, a.y);
        case 8:
            return (
                (d = new ArrayBuffer(28)),
                O(d, 23, a.id, 0, 0),
                (b = new DataView(d)),
                b.setUint16(16, a.buttons),
                b.setInt16(18, a.thumbLX),
                b.setInt16(20, a.thumbLY),
                b.setInt16(22, a.thumbRX),
                b.setInt16(24, a.thumbRY),
                b.setUint8(26, a.leftTrigger),
                b.setUint8(27, a.rightTrigger),
                d
            );
        case 2:
            return P(1, a.button, a.pressed ? 1 : 0, 0);
        case 1:
            return P(0, a.code, a.mod, a.pressed ? 1 : 0);
        case 3:
            return P(2, a.x, a.y, 0);
        case 5:
            return P(4, a.button, a.pressed ? 1 : 0, a.id);
        case 6:
            return P(5, a.axis, a.value, a.id);
        case 7:
            return P(6, 0, 0, a.id);
        case 9:
            return P(24, 0, 0, 0);
    }
}
var R = {},
    S = 1;
function T(a) {
    var b = S++;
    R[b] = a;
    return b;
}
function ha(a) {
    var b = a.getInt16(32),
        d = a.getInt32(16),
        f = 0 < d ? new Uint8Array(a.buffer, 34, d) : null;
    f = f ? T(f) : 0;
    return {
        type: 1,
        cursor: {
            size: d,
            positionX: a.getInt16(24),
            positionY: a.getInt16(26),
            width: a.getInt16(20),
            height: a.getInt16(22),
            hotX: a.getInt16(28),
            hotY: a.getInt16(30),
            imageUpdate: 0 < f,
            relative: !!(b & 256),
            hidden: !!(b & 512),
            stream: 0,
        },
        key: f,
    };
}
function ia(a, b) {
    b = T(new Uint8Array(b.buffer, 13, a.m));
    return { type: 3, id: a.A, key: b };
}
function ja() {
    var a = new Uint8Array(16);
    crypto.getRandomValues(a);
    return a
        .map(function (b) {
            return b % 10;
        })
        .join("");
}
function U(a) {
    var b = this;
    this.l = a;
    this.i = !1;
    this.j = "";
    this.h = !1;
    this.b = this.sdp = null;
    this.c = {};
    this.g = [];
    this.f = null;
    this.b = new RTCPeerConnection({
        iceServers: [{ urls: "stun:47.114.174.231:3478" }],
    });
    this.b.onicecandidate = function (d) {
        d.candidate &&
            ((d = d.candidate.candidate.replace("candidate:", "").split(" ")),
            8 <= d.length &&
                "udp" === d[2].toLowerCase() &&
                b.l(
                    d[4],
                    parseInt(d[5], 10),
                    !1,
                    "srflx" === d[7],
                    "host" === d[7]
                ));
    };
}
U.prototype.close = function () {
    for (var a = q(Object.entries(this.c)), b = a.next(); !b.done; b = a.next())
        b.value[1].close();
    this.b.close();
};
function V(a, b, d, f, g) {
    a.c[d] = a.b.createDataChannel(b, { negotiated: !0, id: d });
    a.c[d].binaryType = "arraybuffer";
    a.c[d].onopen = f;
    a.c[d].onmessage = g;
}
function ka(a) {
    var b;
    return L(function (d) {
        if (1 == d.b) return (b = a), I(d, a.b.createOffer(), 2);
        b.f = d.i;
        for (var f = a.f.sdp.split("\n"), g = {}, l = 0; l < f.length; l++) {
            var c = f[l].split("="),
                e = c[0];
            c = c[1];
            e &&
                ("a" === e
                    ? (g.a || (g.a = {}),
                      (e = c.split(/:(.+)/)),
                      (g.a[e[0]] = e[1]))
                    : (g[e] = c));
        }
        a.sdp = g;
        return d.return({
            ice_ufrag: a.sdp.a["ice-ufrag"],
            ice_pwd: a.sdp.a["ice-pwd"],
            fingerprint: a.sdp.a.fingerprint,
        });
    });
}
U.prototype.send = function (a, b) {
    "open" == this.c[b].readyState && this.c[b].send(a);
};
function W(a) {
    for (; 0 < a.g.length; ) {
        var b = a.g.shift();
        a.b.addIceCandidate(
            new RTCIceCandidate({
                candidate:
                    "candidate:2395300328 1 udp 2113937151 " +
                    b.ip +
                    " " +
                    (b.port +
                        " typ " +
                        (b.from_stun ? "srflx" : "host") +
                        " generation 0 ufrag " +
                        a.j +
                        " network-cost 50"),
                sdpMid: a.sdp.a.mid,
                sdpMLineIndex: 0,
            })
        );
    }
}
function la(a, b, d, f) {
    var g, l;
    L(function (c) {
        switch (c.b) {
            case 1:
                if (!a.f) throw "Offer is not set";
                if (a.h) {
                    c.b = 0;
                    break;
                }
                a.j = b;
                return I(c, a.b.setLocalDescription(a.f), 3);
            case 3:
                c.h = 4;
                var e = a.sdp.a.mid;
                g =
                    "v=0\r\no=- " +
                    (ja() +
                        " 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE ") +
                    (e +
                        "\r\na=msid-semantic: WMS *\r\nm=application 9 DTLS/SCTP 5000\r\nc=IN IP4 0.0.0.0\r\nb=AS:30\r\na=ice-ufrag:") +
                    (b + "\r\na=ice-pwd:") +
                    (d + "\r\na=ice-options:trickle\r\na=fingerprint:") +
                    (f + "\r\na=setup:active\r\na=mid:") +
                    (e +
                        "\r\na=sendrecv\r\na=sctpmap:5000 webrtc-datachannel 256\r\na=max-message-size:1073741823\r\n");
                return I(
                    c,
                    a.b.setRemoteDescription(
                        new RTCSessionDescription({ type: "answer", sdp: g })
                    ),
                    6
                );
            case 6:
                c.b = 5;
                c.h = 0;
                break;
            case 4:
                (c.h = 0), (e = c.f.F), (c.f = null), (l = e), console.log(l);
            case 5:
                a.i && W(a), (a.h = !0), (c.b = 0);
        }
    });
}
function ma(a, b, d, f, g) {
    f
        ? ((a.i = !0),
          setTimeout(function () {
              a.l("1.2.3.4", 1234, !0, !1, !1);
          }, 500))
        : a.g.push({ ip: b.replace("::ffff:", ""), port: d, from_stun: g });
    a.h && a.i && W(a);
}
function Parsec(a) {
    var b = this;
    this.status = Status.PARSEC_NOT_RUNNING;
    this.G = performance.now();
    this.f = {
        encodeLatency: 0,
        decodeLatency: 0,
        networkLatency: 0,
        frameWidth: 0,
        frameHeight: 0,
        fullRange: !1,
        444: !1,
    };
    this.h = [];
    this.b = null;
    this.B = [];
    this.j = "";
    this.c = a;
    this.l = a.getContext("2d");
    this.l.imageSmoothingEnabled = false;
    this.l.Z = "high";
    this.u = [];
    this.s = {};
    this.v = 0;
    this.o = [];
    this.i = this.g = null;
    this.B.push(
        addEvtListener(window, "beforeunload", function () {
            b.D();
            return null;
        })
    );
}
function na(a) {
    var last = performance.now();
    window.frameInterval = parseInt(
        localStorage.getItem("frameInterval") || "40"
    );
    a.g ||
        (a.g = new AudioDecoder({
            output: function (b) {
                if ("f32" == b.format) {
                    var d = new ArrayBuffer(
                        b.allocationSize({ planeIndex: 0 })
                    );
                    b.copyTo(d, { planeIndex: 0 });
                    a.o.push(new Float32Array(d));
                    b.close();
                }
            },
            error: function (b) {
                console.log("Audio decode error:", b);
            },
        }));
    a.i ||
        (a.i = new VideoDecoder({
            output: function (b) {
                window.requestAnimationFrame(function () {
                    a.f.frameWidth = b.displayWidth;
                    a.f.frameHeight = b.displayHeight;
                    a.f.fullRange = b.colorSpace.fullRange;
                    a.f["444"] = "I444" == b.format;
                    a.f.decodeLatency =
                        0.9 * a.f.decodeLatency +
                        0.1 * (performance.now() - b.timestamp / 1e3);
                    if (window.resizeFlag) {
                        a.c.width = Math.round(
                            document.body.clientWidth * window.devicePixelRatio
                        );
                        a.c.height = Math.round(
                            document.body.clientHeight * window.devicePixelRatio
                        );
                        window.resizeFlag = false;
                    }

                    var d = b.displayWidth / b.displayHeight,
                        f = 0,
                        g = 0;
                    if (
                        (0 < a.c.height ? a.c.width / a.c.height : 1.77777777) >
                        d
                    ) {
                        var l = a.c.height * d;
                        d = a.c.height;
                        f = (a.c.width - l) / 2;
                    } else (l = a.c.width), (d = a.c.width / d), (g = (a.c.height - d) / 2);
                    var now = performance.now();
                    if (now - last > window.frameInterval) {
                        a.l.drawImage(
                            b,
                            0,
                            0,
                            a.f.frameWidth,
                            a.f.frameHeight,
                            f,
                            g,
                            l,
                            d
                        );
                        last = now;
                    }
                    b.close();
                });
            },
            error: function (b) {
                console.log("Video decode error:", b);
            },
        }));
}
function Y(a) {
    a.i && a.i.reset();
    a.g && a.g.reset();
    a.o = [];
    a.l.clearRect(0, 0, a.c.width, a.c.height);
}
function Z(a, b) {
    b != Status.PARSEC_OK &&
        (a.b && a.status == Status.PARSEC_OK && a.b.send(P(10, 0, 0, 0), 0),
        a.b && (a.b.close(), (a.b = null)),
        Y(a));
    a.status = b;
    a.u = [];
    a.s = {};
    a.v = 0;
}
h = Parsec.prototype;
Parsec.prototype.destroy = function () {
    for (var a = q(this.B), b = a.next(); !b.done; b = a.next())
        (b = b.value), b[0].removeEventListener(b[1], b[2]);
    this.C(Status.PARSEC_NOT_RUNNING);
};
Parsec.prototype.getBufferSize = function (a) {
    a = R[a];
    return void 0 != a ? a.length : 0;
};
Parsec.prototype.getBuffer = function (a) {
    var b = R[a];
    void 0 != b && delete R[a];
    return void 0 == b ? null : b;
};
Parsec.prototype.clientNewAttempt = function (a) {
    var b = this,
        d,
        f,
        g;
    return L(function (l) {
        if (1 == l.b) {
            d =
                /Chrome/.test(navigator.userAgent) &&
                /Google Inc/.test(navigator.vendor);
            if (!d)
                return (b.status = Status.PARSEC_WRN_BROWSER), l.return(null);
            if (b.status != Status.PARSEC_NOT_RUNNING) return l.return(null);
            b.status = Status.PARSEC_CONNECTING;
            R = {};
            S = 1;
            na(b);
            Y(b);
            b.j = a;
            b.h = [];
            f = function (c, e, k, m, p) {
                b.h.push({
                    type: 8,
                    attemptID: b.j,
                    ip: c,
                    port: e,
                    lan: p,
                    fromStun: m,
                    sync: k,
                });
            };
            g = function () {
                b.B.push(
                    addEvtListener(document, "visibilitychange", function () {
                        document.hidden
                            ? b.b && b.b.send(P(19, 0, 0, 0), 0)
                            : b.b && b.b.send(P(13, 0, 0, 0), 0);
                    })
                );
                var c = window.screen.width,
                    e = window.screen.height;
                if (800 > c || 600 > e || 1920 < c || 1080 < e)
                    (c = 1920), (e = 1080);
                b.b && b.b.send(ea(c, e), 0);
                Z(b, Status.PARSEC_OK);
            };
            b.b = new U(f);
            V(b.b, "control", 0, g, function (c) {
                b.G = performance.now();
                var e = new DataView(c.data);
                c = {
                    m: e.getInt32(0),
                    A: e.getInt32(4),
                    V: e.getInt32(8),
                    type: e.getInt8(12),
                };
                switch (c.type) {
                    case 10:
                        b.status = c.m;
                        break;
                    case 21:
                        b.f.encodeLatency = parseFloat(c.A) / 1e3;
                        b.f.networkLatency = 0;
                        break;
                    case 20:
                        b.h.push({
                            type: 2,
                            gamepadID: c.m,
                            motorBig: c.A,
                            motorSmall: c.V,
                        });
                        break;
                    case 16:
                        b.h.push({ type: c.m ? 4 : 5 });
                        break;
                    case 28:
                        b.v = c.m;
                        break;
                    case 17:
                        b.h.push(ia(c, e));
                        break;
                    case 9:
                        b.h.push(ha(e));
                        break;
                    case 25:
                        e = JSON.parse(
                            new TextDecoder("utf-8").decode(
                                new Uint8Array(e.buffer, 13, c.m - 1)
                            )
                        );
                        for (var k = {}, m = 0; m < e.length; m++)
                            e[m].id == c.A && (k = e[m]);
                        c = { list: e, me: k };
                        b.u = c.list;
                        b.s = c.me;
                }
            });
            V(b.b, "video", 1, null, function (c) {
                "configured" != b.i.state &&
                    b.i.configure({
                        codec: "avc1.42001e",
                        hardwareAcceleration: "prefer-software",
                        optimizeForLatency: !0,
                    });
                c = new EncodedVideoChunk({
                    type: "key",
                    data: c.data,
                    timestamp: 1e3 * performance.now(),
                    duration: 0,
                });
                b.i.decode(c);
            });
            V(b.b, "audio", 2, null, function (c) {
                "configured" != b.g.state &&
                    b.g.configure({
                        codec: "opus",
                        sampleRate: 48e3,
                        numberOfChannels: 2,
                    });
                c = new EncodedAudioChunk({
                    type: "key",
                    data: c.data,
                    timestamp: 1e3 * performance.now(),
                    duration: 0,
                });
                b.g.decode(c);
            });
            return I(l, ka(b.b), 2);
        }
        return l.return(l.i);
    });
};
Parsec.prototype.clientBeginP2P = function (a, b, d, f, g) {
    this.j == a && this.b && la(this.b, d, f, g);
};
Parsec.prototype.clientAddCandidate = function (a, b, d, f, g) {
    this.j == a && this.b && ma(this.b, b, d, f, g);
};
Parsec.prototype.clientGetStatus = function () {
    return this.status;
};
Parsec.prototype.clientGetSelf = function () {
    return this.s;
};
Parsec.prototype.clientGetHostMode = function () {
    return this.v;
};
Parsec.prototype.clientGetGuests = function () {
    return this.u;
};
Parsec.prototype.clientDisconnect = function (a) {
    Z(this, a);
};
Parsec.prototype.clientSendUserData = function (a, b) {
    this.b && this.status == Status.PARSEC_OK && this.b.send(Q(17, a, b), 0);
};
Parsec.prototype.clientSendMessage = function (a) {
    this.b &&
        this.status == Status.PARSEC_OK &&
        this.b.send(
            fa(
                a,
                this.f.frameWidth,
                this.f.frameHeight,
                this.c.width,
                this.c.height
            ),
            0
        );
};
Parsec.prototype.clientPollEvents = function () {
    return this.h.shift();
};
Parsec.prototype.clientGetMetrics = function () {
    return this.f;
};
Parsec.prototype.clientNetworkFailure = function () {
    return this.status == Status.PARSEC_OK && 5e3 < performance.now() - this.G;
};
Parsec.prototype.clientPollAudio = function () {
    return this.o.shift();
};

Parsec.prototype.Status = Status;
window.Parsec = Parsec;
