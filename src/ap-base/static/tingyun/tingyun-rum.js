(window._ty_rum && window._ty_rum.server) ||
  (function (t) {
    function r(t) {
      switch (typeof t) {
        case 'object':
          if (!t) return 'null';
          if (t instanceof Array) {
            for (var e = '[', n = 0; n < t.length; n++)
              e += (n > 0 ? ',' : '') + r(t[n]);
            return e + ']';
          }
          var e = '{',
            n = 0;
          for (var a in t)
            if ('function' != typeof t[a]) {
              var o = r(t[a]);
              (e += (n > 0 ? ',' : '') + r(a) + ':' + o), n++;
            }
          return e + '}';
        case 'string':
          return (
            '"' + t.replace(/([\"\\])/g, '\\$1').replace(/\n/g, '\\n') + '"'
          );
        case 'number':
          return t.toString();
        case 'boolean':
          return t ? 'true' : 'false';
        case 'function':
          return r(t.toString());
        case 'undefined':
        default:
          return '"undefined"';
      }
    }
    function e(t) {
      return O ? O(t) : t;
    }
    function n() {
      return Date.now ? Date.now() : new Date().valueOf();
    }
    function a(t, r, e) {
      function n() {
        var t = N.args.apply(this, arguments);
        return r(o, t, e);
      }
      var a,
        o = t[t.length - 1];
      if ('function' == typeof o) {
        switch (o.length) {
          case 0:
            a = function () {
              return n.apply(this, arguments);
            };
            break;
          case 1:
            a = function (t) {
              return n.apply(this, arguments);
            };
            break;
          case 2:
            a = function (t, r) {
              return n.apply(this, arguments);
            };
            break;
          case 3:
            a = function (t, r, e) {
              return n.apply(this, arguments);
            };
            break;
          case 4:
            a = function (t, r, e, a) {
              return n.apply(this, arguments);
            };
            break;
          case 5:
            a = function (t, r, e, a, o) {
              return n.apply(this, arguments);
            };
            break;
          default:
            for (var i = [], s = 0, u = o.length; s < u; s++) i.push('_' + s);
            a = eval(
              '(function(){return function(' +
                i.join(',') +
                '){var args = [].slice.call(arguments, 0);return r(o, args, e);};})();'
            );
        }
        t[t.length - 1] = a;
      }
      return t;
    }
    function o(t, r) {
      return t && r && (t.moduleName = r), t;
    }
    function i(t, r, e) {
      return function () {
        try {
          (E = r), e && s(r), t.apply(this, arguments), e && u();
        } catch (n) {
          throw (e && u(), o(n, r));
        }
      };
    }
    function s(r) {
      N.each(['setTimeout', 'setInterval'], function (e) {
        N.wrap(!0, t, e, function (t) {
          return function () {
            var e,
              n = N.args.apply(this, arguments),
              a = n[0];
            return (
              'function' == typeof a && (e = i(a, r, !0)),
              e && (n[0] = e),
              t.apply
                ? t.apply(this, n)
                : Function.prototype.apply.apply(t, [t, n])
            );
          };
        });
      });
    }
    function u() {
      N.each(['setTimeout', 'setInterval'], function (r) {
        N.unwrap(t, r);
      });
    }
    function c(t) {
      P &&
        N.wrap(!1, P.prototype, 'addEventListener', function (r) {
          return function () {
            var e,
              n = N.args.apply(this, arguments),
              a = n[1];
            return (
              'function' == typeof a && (e = i(a, t, !0)),
              e && (n[1] = e),
              r.apply(this, n)
            );
          };
        }),
        s(t);
    }
    function f() {
      P && N.unwrap(P.prototype, 'addEventListener'), u();
    }
    function l(t) {
      return function (t, r) {};
    }
    function p() {
      if (this.errors.length) {
        var t = (function (t) {
            var r = [],
              e = {};
            N.each(t, function (t) {
              var r = _(t[1], t[2], t[3], t[6]);
              e[r]
                ? (e[r][4] += 1)
                : (e[r] = [
                    t[1],
                    t[2],
                    t[3],
                    '#' == t[4] ? x.URL : t[4],
                    1,
                    t[5],
                    t[6],
                    t[7]
                  ]);
            });
            for (var n in e) r.push(e[n]);
            return r;
          })(this.errors),
          r = this;
        N.POST(
          N.mkurl(D.server.beacon, 'err', {
            fu: q ? q : q++,
            os: parseInt((n() - (B || D.st)) / 1e3)
          }),
          N.stringify({ datas: t }),
          {},
          function (t, e) {
            t || (r.errors = []);
          }
        );
      }
    }
    function d() {
      j.initend();
    }
    function h() {
      'complete' === x.readyState && j.initend();
    }
    function y(t) {
      function r() {
        j.send();
      }
      return (
        !!D.load_time ||
        (j.initend(),
        (D.load_time = n()),
        void (9 === t ? r() : setTimeout(r, 0)))
      );
    }
    function m() {
      z || y(9), N.bind(p, j)(), (z = 1);
    }
    function v() {
      j.touch || (j.touch = n());
    }
    function g(t) {
      if (t[6]) {
        var r = t[4],
          e = t[5];
        if (e && 'string' == typeof e && r) {
          e = e.split(/\n/);
          var n = C.exec(e[0]);
          n || (n = C.exec(e[1])),
            n &&
              n[1] != r &&
              ((t[4] = n[1] || r),
              (t[2] = n[2] || t[2]),
              (t[3] = n[3] || t[3]));
        }
      }
    }
    function _(t, r, e, n) {
      return t + r + e + (n ? n : '');
    }
    function w(r) {
      var e = arguments,
        a = 'unknown',
        o = [n()];
      if (0 != e.length) {
        if ('string' == typeof r) {
          var i = e.length < 4 ? e.length : 4;
          (o[1] = e[0]),
            i > 2 && ((o[2] = e[2]), (o[3] = 0), (o[4] = e[1])),
            i > 3 && e[3] && (o[3] = e[3]);
        } else if (
          r instanceof Event ||
          (t.ErrorEvent && r instanceof ErrorEvent)
        ) {
          if (
            ((o[1] =
              r.message ||
              (r.error && r.error.constructor.name) +
                (r.error && r.error.message) ||
              ''),
            (o[2] = r.lineno ? r.lineno : 0),
            (o[3] = r.colno ? r.colno : 0),
            (o[4] =
              r.filename ||
              (r.error && r.error.fileName) ||
              (r.target && r.target.baseURI) ||
              ''),
            !o[4] && M)
          )
            return;
          o[4] == x.URL && (o[4] = '#'),
            r.error
              ? ((o[5] = r.error.stack), (o[6] = r.error.moduleName))
              : ((o[5] = null), (o[6] = null));
          var s = _(o[1], o[2], o[3], o[6]);
          if (((o[7] = J[s] ? 0 : 1), (J[s] = !0), o[1] === a && o[4] === a))
            return;
          g(o);
        }
        j.errors.push(o);
      }
    }
    function S(t) {
      return function () {
        var r = arguments;
        if (!this._ty_wrap) {
          var e = N.args.apply(this, r);
          this._ty_rum = { method: e[0], url: e[1], start: n() };
        }
        try {
          return t.apply(this, r);
        } catch (a) {
          return Function.prototype.apply.call(t, this, r);
        }
      };
    }
    function T(r) {
      return 'string' == typeof r
        ? r.length
        : t.ArrayBuffer && r instanceof ArrayBuffer
        ? r.byteLength
        : t.Blob && r instanceof Blob
        ? r.size
        : r && r.length
        ? r.length
        : 0;
    }
    function b(r) {
      return function () {
        function e(t) {
          var r,
            e,
            a = p._ty_rum;
          if (a) {
            if (
              (4 !== a.readyState && (a.end = n()),
              (a.s = p.status),
              '' == p.responseType || 'text' == p.responseType)
            )
              a.res = T(p.responseText);
            else if (p.response) a.res = T(p.response);
            else
              try {
                a.res = T(p.responseText);
              } catch (o) {
                a.res = 0;
              }
            if (
              ((a.readyState = p.readyState),
              (a.cb_time = d),
              (r = [
                a.method + ' ' + a.url,
                a.s > 0 ? a.end - a.start : 0,
                d,
                a.s,
                a.s > 0 ? 0 : t,
                a.res,
                a.req
              ]),
              a.r &&
                ((e = i(p)),
                e &&
                  (e = e.xData) &&
                  (r.push(e.id),
                  r.push(e.action),
                  r.push(e.time && e.time.duration),
                  r.push(e.time && e.time.qu))),
              D.aa.push(r),
              D.server.custom_urls && D.server.custom_urls.length && !j.ct)
            ) {
              if (!D.pattern) {
                D.pattern = [];
                for (var s = 0; s < D.server.custom_urls.length; s++)
                  D.pattern.push(new RegExp(D.server.custom_urls[s]));
              }
              for (var s = 0; s < D.pattern.length; s++)
                if (a.url.match(D.pattern[s])) {
                  j.ct = a.end + d;
                  break;
                }
            }
            j.sa(), (p._ty_rum = null);
          }
        }
        function a() {
          4 == p.readyState && e(0);
        }
        function i(r) {
          var e;
          if (r.getResponseHeader) {
            var n = N.parseJSON(r.getResponseHeader('X-Tingyun-Tx-Data'));
            n &&
              n.r &&
              r._ty_rum &&
              n.r + '' == r._ty_rum.r + '' &&
              ((e = { name: r._ty_rum.url, xData: n }),
              X && t._ty_rum.c_ra.push(e));
          }
          return e;
        }
        function c(t) {
          return function () {
            var r, e;
            4 == p.readyState &&
              p._ty_rum &&
              ((p._ty_rum.end = r = n()), (p._ty_rum.readyState = 4));
            try {
              E && s(E), (e = t.apply(this, arguments)), E && u();
            } catch (i) {
              throw ((i = o(i, E)), E && u(), (E = null), i);
            }
            return 4 == p.readyState && (d = n() - r), a(), e;
          };
        }
        function f(t) {
          return function () {
            var r = p._ty_rum;
            return (
              !r ||
              'progress' == t ||
              ('abort' == t
                ? e(905)
                : 'loadstart' == t
                ? (r.start = n())
                : 'error' == t
                ? e(990)
                : 'timeout' == t && e(903),
              !0)
            );
          };
        }
        function l(t, r) {
          r instanceof Array || (r = [r]);
          for (var e = 0; e < r.length; e++) {
            var n = r[e];
            N.sh(t, n, f(n), !1);
          }
        }
        if (!this._ty_wrap) {
          (this._ty_rum.start = n()),
            (this._ty_rum.req = arguments[0] ? T(arguments[0]) : 0);
          var p = this,
            d = 0,
            h = N.wrap(!1, this, 'onreadystatechange', c);
          h || N.sh(this, 'readystatechange', a, !1),
            l(this, [
              'error',
              'progress',
              'abort',
              'load',
              'loadstart',
              'loadend',
              'timeout'
            ]),
            h ||
              setTimeout(function () {
                N.wrap(!1, p, 'onreadystatechange', c);
              }, 0);
        }
        var y = (function () {
            function t(t) {
              var r = {},
                e =
                  /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?/.exec(
                    t
                  );
              return (
                e &&
                  ((r.protocol = e[1] ? e[1] + ':' : 'http:'),
                  (r.hostname = e[3]),
                  (r.port = e[4] || '')),
                r
              );
            }
            return function (r) {
              var e = location;
              if ((r = N.trim(r))) {
                if (
                  ((r = r.toLowerCase()),
                  r.startsWith('//') && (r = e.protocol + r),
                  !r.startsWith('http'))
                )
                  return !0;
                var n = t(r),
                  a = n.protocol === e.protocol && n.hostname === e.hostname;
                return (
                  a &&
                    (a =
                      n.port === e.port ||
                      (!e.port &&
                        (('http:' === e.protocol && '80' === n.port) ||
                          ('https:' === e.protocol && '443' === n.port)))),
                  a
                );
              }
              return !1;
            };
          })(),
          m = arguments;
        try {
          var v = D.server;
          v &&
            v.id &&
            this._ty_rum &&
            y(this._ty_rum.url) &&
            ((this._ty_rum.r = new Date().getTime() % 1e8),
            this.setRequestHeader &&
              this.setRequestHeader(
                'X-Tingyun-Id',
                v.id + ';r=' + this._ty_rum.r
              ));
        } catch (g) {}
        try {
          return r.apply(this, m);
        } catch (_) {
          return Function.prototype.apply.call(r, this, m);
        }
      };
    }
    var E,
      k = t.XMLHttpRequest,
      x = document,
      R = Object.defineProperty,
      L = t.define,
      P = t.EventTarget,
      q = 0,
      C = new RegExp('([a-z]+:/{2,3}.*):(\\d+):(\\d+)'),
      O = t.encodeURIComponent,
      B = null,
      N = {
        wrap: function (t, r, e, n, a) {
          try {
            var o = r[e];
          } catch (i) {
            if (!t) return !1;
          }
          if (!o && !t) return !1;
          if (o && o._ty_wrap) return !1;
          try {
            r[e] = n(o, a);
          } catch (i) {
            return !1;
          }
          return (r[e]._ty_wrap = [o]), !0;
        },
        unwrap: function (t, r) {
          try {
            var e = t[r]._ty_wrap;
            e && (t[r] = e[0]);
          } catch (n) {}
        },
        each: function (t, r) {
          if (t) {
            var e;
            for (e = 0; e < t.length && (!t[e] || !r(t[e], e, t)); e += 1);
          }
        },
        mkurl: function (r, a) {
          var o = arguments,
            i = /^https/i.test(x.URL) ? 'https' : 'http';
          if (
            ((i =
              i +
              '://' +
              r +
              '/' +
              a +
              '?av=1.3.3&v=1.3.2&key=' +
              e(D.server.key) +
              '&ref=' +
              e(x.URL) +
              '&rand=' +
              n() +
              '&pvid=' +
              H),
            'pf' !== a &&
              D &&
              ((D.agent = D.agent || t._ty_rum.agent),
              D.agent && D.agent.n && (i += '&n=' + e(D.agent.n))),
            o.length > 2)
          ) {
            var s = o[2];
            for (var u in s) i += '&' + u + '=' + s[u];
          }
          return (
            A.host && (i += '&cshst=' + e(A.host)),
            A.url && (i += '&csurl=' + e(A.url)),
            i
          );
        },
        GET: function (t, r) {
          function e() {
            r && r.apply(this, arguments),
              n.parentNode && n.parentNode.removeChild(n);
          }
          if (navigator && navigator.sendBeacon && F.test(t))
            return navigator.sendBeacon(t, null);
          var n = x.createElement('img');
          return (
            n.setAttribute('src', t),
            n.setAttribute('style', 'display:none'),
            this.sh(
              n,
              'readystatechange',
              function () {
                ('loaded' != n.readyState && 4 != n.readyState) || e('loaded');
              },
              !1
            ),
            this.sh(
              n,
              'load',
              function () {
                return e('load'), !0;
              },
              !1
            ),
            this.sh(
              n,
              'error',
              function () {
                return e('error'), !0;
              },
              !1
            ),
            x.body.appendChild(n)
          );
        },
        fpt: function (t, r, e) {
          function n(t, r, e) {
            var n = x.createElement(t);
            try {
              for (var a in r) n[a] = r[a];
            } catch (o) {
              var i = '<' + t;
              for (var a in r) i += ' ' + a + '="' + r[a] + '"';
              (i += '>'), e || (i += '</' + t + '>'), (n = x.createElement(i));
            }
            return n;
          }
          var a = n('div', { style: 'display:none' }, !1),
            o = n(
              'iframe',
              {
                name: '_ty_rum_frm',
                width: 0,
                height: 0,
                style: 'display:none'
              },
              !1
            ),
            i = n(
              'form',
              {
                style: 'display:none',
                action: t,
                enctype: 'application/x-www-form-urlencoded',
                method: 'post',
                target: '_ty_rum_frm'
              },
              !1
            ),
            s = n('input', { name: 'data', type: 'hidden' }, !0);
          return (
            (s.value = r),
            i.appendChild(s),
            a.appendChild(o),
            a.appendChild(i),
            x.body.appendChild(a),
            i.submit(),
            (o.onreadystatechange = function () {
              ('complete' !== o.readyState && 4 !== o.readyState) ||
                (e(null, o.innerHTML), x.body.removeChild(a));
            }),
            !0
          );
        },
        POST: function (r, e, n, a) {
          if (this.ie) return this.fpt(r, e, a);
          if (navigator && navigator.sendBeacon && F.test(r)) {
            var o = navigator.sendBeacon(r, e);
            return a(!o), o;
          }
          var i;
          if (t.XDomainRequest)
            return (
              (i = new XDomainRequest()),
              i.open('POST', r),
              (i.onload = function () {
                a(null, i.responseText);
              }),
              this.sh(
                i,
                'load',
                function () {
                  a(null, i.responseText);
                },
                !1
              ),
              this.sh(
                i,
                'error',
                function () {
                  a('POST(' + r + ')error');
                },
                !1
              ),
              this.wrap(!0, i, 'onerror', function (t) {
                return function () {
                  return a && a('post error', i.responseText), !0;
                };
              }),
              i.send(e),
              !0
            );
          if (!k) return !1;
          (i = new k()), i.overrideMimeType && i.overrideMimeType('text/html');
          try {
            i._ty_wrap = 1;
          } catch (s) {}
          var u = 0;
          (i.onreadystatechange = function () {
            4 == i.readyState &&
              200 == i.status &&
              (0 == u && a(null, i.responseText), u++);
          }),
            i.onerror &&
              this.wrap(!0, i, 'onerror', function (t) {
                return function () {
                  return (
                    a('post error', i.responseText),
                    'function' != typeof t || t.apply(this, arguments)
                  );
                };
              });
          try {
            i.open('POST', r, !0);
          } catch (s) {
            return this.fpt(r, e, a);
          }
          for (var c in n) i.setRequestHeader(c, n[c]);
          return i.send(e), !0;
        },
        sh: function (t, r, e, n) {
          return t.addEventListener
            ? t.addEventListener(r, e, n)
            : !!t.attachEvent && t.attachEvent('on' + r, e);
        },
        args: function () {
          for (var t = [], r = 0; r < arguments.length; r++)
            t.push(arguments[r]);
          return t;
        },
        stringify: r,
        parseJSON: function (r) {
          if (r && 'string' == typeof r) {
            var e = t.JSON
              ? t.JSON.parse
              : function (t) {
                  return new Function('return ' + t)();
                };
            return e(r);
          }
          return null;
        },
        trim: $
          ? function (t) {
              return null == t ? '' : $.call(t);
            }
          : function (t) {
              return null == t
                ? ''
                : t.toString().replace(/^\s+/, '').replace(/\s+$/, '');
            },
        extend: function (t, r) {
          if (t && r) for (var e in r) r.hasOwnProperty(e) && (t[e] = r[e]);
          return t;
        },
        bind: function (t, r) {
          return function () {
            t.apply(r, arguments);
          };
        }
      },
      A = {},
      D = (t._ty_rum = N.extend(
        {
          st: n(),
          ra: [],
          c_ra: [],
          aa: [],
          snd_du: function () {
            return this.server.adu ? 1e3 * this.server.adu : 1e4;
          },
          cc: function () {
            return this.server.ac ? this.server.ac : 10;
          },
          config: function (t, r) {
            var e;
            if ('object' == typeof t) e = t;
            else {
              if ('string' != typeof t || void 0 === r)
                throw new Error('illegal arguments');
              (e = {}), (e[t] = r);
            }
            for (var n in e) A[n] = e[n];
            return this;
          }
        },
        t._ty_rum || {}
      ));
    var ty_rum = D;
    ty_rum.server = {
      id: 'kBBGSnp3Tcg',
      ignore_err: true,
      beacon: 'beacon.tingyun.com',
      beacon_err: 'beacon-err.tingyun.com',
      key: 'hNl39vGIfXg',
      trace_threshold: 7000,
      custom_urls: [],
      sr: 1.0
    };
    if (D.server && !(D.server.sr && Math.random() >= D.server.sr)) {
      var I = 'ignore_err',
        M = !(I in D.server) || D.server[I],
        $ = String.prototype.trim;
      String.prototype.startsWith ||
        (String.prototype.startsWith = function (t, r) {
          return (r = r || 0), this.indexOf(t, r) === r;
        });
      var F = /^http/i,
        H = (function () {
          function t() {
            return ((65536 * (1 + Math.random())) | 0)
              .toString(16)
              .substring(1);
          }
          return t() + '-' + t() + t();
        })();
      try {
        R &&
          R(t, 'define', {
            get: function () {
              return L;
            },
            set: function (t) {
              'function' == typeof t && (t.amd || t.cmd)
                ? ((L = function () {
                    var r = N.args.apply(this, arguments);
                    if (3 !== r.length) return t.apply(this, r);
                    var e = 'string' == typeof r[0] ? r[0] : 'anonymous';
                    return t.apply(
                      this,
                      a(
                        r,
                        function (t, r, e) {
                          var n;
                          try {
                            (E = e), c(e), (n = t.apply(this, r)), f();
                          } catch (a) {
                            throw (f(), o(a, e));
                          }
                          return n;
                        },
                        e
                      )
                    );
                  }),
                  N.extend(L, t))
                : (L = t);
            },
            configurable: !0
          });
      } catch (U) {}
      var X = t.performance ? t.performance : t.Performance;
      X &&
        (N.sh(
          X,
          'resourcetimingbufferfull',
          function () {
            var t = X.getEntriesByType('resource');
            t && ((D.ra = D.ra.concat(t)), X.clearResourceTimings());
          },
          !1
        ),
        N.sh(
          X,
          'webkitresourcetimingbufferfull',
          function () {
            var t = X.getEntriesByType('resource');
            t && ((D.ra = D.ra.concat(t)), X.webkitClearResourceTimings());
          },
          !1
        ));
      for (
        var j = (D.metric = {
            ready: function () {
              return D.load_time;
            },
            initend: function () {
              function t() {
                j.sa();
              }
              D.end_time ||
                ((D.end_time = n()), (this._h = setInterval(t, 2e3)));
            },
            send: function () {
              function r() {
                function r(t) {
                  return a[t] > 0 ? a[t] - i : 0;
                }
                var n = {};
                if (X && X.timing) {
                  var a = X.timing;
                  i = a.navigationStart;
                  var o = r('domainLookupStart'),
                    s = r('domainLookupEnd'),
                    u = r('redirectStart'),
                    c = r('redirectEnd'),
                    f = r('connectStart'),
                    l = r('connectEnd');
                  (n = {
                    f: r('fetchStart'),
                    qs: r('requestStart'),
                    rs: r('responseStart'),
                    re: r('responseEnd'),
                    os: r('domContentLoadedEventStart'),
                    oe: r('domContentLoadedEventEnd'),
                    oi: r('domInteractive'),
                    oc: r('domComplete'),
                    ls: r('loadEventStart'),
                    le: r('loadEventEnd'),
                    tus: r('unloadEventStart'),
                    tue: r('unloadEventEnd')
                  }),
                    l - f > 0 && ((n.cs = f), (n.ce = l)),
                    s - o > 0 && ((n.ds = o), (n.de = s)),
                    (c - u > 0 || c > 0) && ((n.es = u), (n.ee = c)),
                    0 == n.le && (n.ue = D.load_time - i);
                  var p;
                  if (a.msFirstPaint) p = a.msFirstPaint;
                  else if (t.chrome && chrome.loadTimes) {
                    var d = chrome.loadTimes();
                    d && d.firstPaintTime && (p = 1e3 * d.firstPaintTime);
                  } else D.firstPaint && (p = D.firstPaint);
                  p && (n.fp = Math.round(p - i)),
                    a.secureConnectionStart &&
                      (n.sl = r('secureConnectionStart'));
                } else n = { t: i, os: D.end_time - i, ls: D.load_time - i };
                (n.je = j.errors.length),
                  j.ct && (n.ct = j.ct - i),
                  j.touch && (n.fi = j.touch - i);
                var h = D.agent || (t._ty_rum && t._ty_rum.agent);
                return (
                  h &&
                    ((n.id = e(h.id)),
                    (n.a = h.a),
                    (n.q = h.q),
                    (n.tid = e(h.tid)),
                    (n.n = e(h.n))),
                  (n.sh = t.screen && t.screen.height),
                  (n.sw = t.screen && t.screen.width),
                  n
                );
              }
              function a(r) {
                var e = t._ty_rum.c_ra;
                if (r)
                  for (var n = e.length - 1; n >= 0; n--)
                    if (r.indexOf(e[n].name) > -1) return e[n].xData;
                return null;
              }
              function o(t) {
                function r(t) {
                  return f[t] > 0 ? f[t] : 0;
                }
                if (t < D.server.trace_threshold) return null;
                var n = X;
                if (n && n.getEntriesByType) {
                  var o = { tr: !0, tt: e(x.title), charset: x.characterSet },
                    s = D.ra,
                    u = n.getEntriesByType('resource');
                  u &&
                    ((s = s.concat(u)),
                    n.webkitClearResourceTimings &&
                      n.webkitClearResourceTimings(),
                    n.clearResourceTimings && n.clearResourceTimings()),
                    (o.res = []);
                  for (var c = 0; c < s.length; c++) {
                    var f = s[c],
                      l = {
                        o: r('startTime'),
                        rt: f.initiatorType,
                        n: f.name,
                        f: r('fetchStart'),
                        ds: r('domainLookupStart'),
                        de: r('domainLookupEnd'),
                        cs: r('connectStart'),
                        ce: r('connectEnd'),
                        sl: r('secureConnectionStart'),
                        qs: r('requestStart'),
                        rs: r('responseStart'),
                        re: r('responseEnd')
                      },
                      p = a(f.name);
                    p &&
                      ((l.aid = p.id),
                      (l.atd = p.trId),
                      (l.an = p.action),
                      (l.aq = p.time && p.time.qu),
                      (l.as = p.time && p.time.duration)),
                      o.res.push(l);
                  }
                  if (j.errors.length) {
                    o.err = [];
                    for (var c = 0, d = j.errors, h = d.length; c < h; c++)
                      o.err.push({
                        o: Math.round(d[c][0] - i),
                        e:
                          d[c][1] &&
                          d[c][1]
                            .replace(/([\"\\])/g, '\\$1')
                            .replace(/\n/g, '\\n'),
                        l: d[c][2],
                        c: d[c][3],
                        r: d[c][4],
                        ec: h,
                        s: d[c][5],
                        m: d[c][6],
                        ep: d[c][7]
                      });
                  }
                  return o;
                }
                return null;
              }
              if (this.sended) return !1;
              if (!this.ready()) return !1;
              var i = D.st,
                s = {};
              try {
                var u = r();
                s = o(u.ls > 0 ? u.ls : D.load_time - i);
              } catch (c) {}
              s = s ? N.stringify(s) : '';
              var f = N.mkurl(D.server.beacon, 'pf', u);
              (B = n()),
                (0 != s.length && N.POST(f, s, {}, l('POST'))) || N.GET(f);
              var d = N.bind(p, this);
              return (
                d(), setInterval(d, 1e4), (this.sended = !0), this.sa(1), !0
              );
            },
            sa: function (t) {
              (this.ready() || t) &&
                (t ||
                  (t =
                    !this._last_send ||
                    n() - this._last_send > D.snd_du() ||
                    D.aa.length >= D.cc()),
                D.aa.length > 0 &&
                  t &&
                  ((this._last_send = n()),
                  N.POST(
                    N.mkurl(D.server.beacon, 'xhr'),
                    N.stringify({ xhr: D.aa }),
                    {},
                    l('POST')
                  ),
                  (D.aa = [])));
            },
            errors: []
          }),
          z = null,
          J = {},
          W = [
            ['load', y],
            ['beforeunload', m],
            ['pagehide', m],
            ['unload', m]
          ],
          G = 0;
        G < W.length;
        G++
      )
        N.sh(t, W[G][0], W[G][1], !1);
      t.addEventListener
        ? N.sh(t, 'error', w, !1)
        : (t.onerror = function (t, r, e, a, o) {
            if (r || !M) {
              var i = [n(), t, e, a, r == x.URL ? '#' : r],
                s = _(t, e, a, o && o.moduleName);
              (i = i.concat([o && o.stack, o && o.moduleName, J[s] ? 0 : 1])),
                (J[s] = !0),
                g(i),
                j.errors.push(i);
            }
          });
      for (
        var Z = [
            ['scroll', v],
            ['keypress', v],
            ['click', v],
            ['DOMContentLoaded', d],
            ['readystatechange', h]
          ],
          G = 0;
        G < Z.length;
        G++
      )
        N.sh(x, Z[G][0], Z[G][1], !1);
      if (
        (N.wrap(!1, t, 'requestAnimationFrame', function (r) {
          return function () {
            return (
              (D.firstPaint = n()),
              (t.requestAnimationFrame = r),
              r.apply(this, arguments)
            );
          };
        }),
        k)
      )
        if (k.prototype)
          N.wrap(!1, k.prototype, 'open', S),
            N.wrap(!1, k.prototype, 'send', b);
        else {
          N.ie = 7;
          var Q = k;
          t.XMLHttpRequest = function () {
            var t = new Q();
            return N.wrap(!1, t, 'open', S), N.wrap(!1, t, 'send', b), t;
          };
        }
      else t.ActiveXObject && (N.ie = 6);
    }
  })(window);
