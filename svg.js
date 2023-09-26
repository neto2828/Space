!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? e(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], e)
    : e(((t = t || self).window = t.window || {}));
})(this, function (t) {
  "use strict";
  function m(t) {
    return "string" == typeof t;
  }
  var b = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
    S = /(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
    N = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi,
    r = /(^[#\.][a-z]|[a-y][a-z])/i,
    E = Math.PI / 180,
    H = Math.sin,
    B = Math.cos,
    D = Math.abs,
    Q = Math.sqrt,
    s = function _isNumber(t) {
      return "number" == typeof t;
    },
    h = function _round(t) {
      return Math.round(1e5 * t) / 1e5 || 0;
    };
  function reverseSegment(t) {
    var e,
      n = 0;
    for (t.reverse(); n < t.length; n += 2)
      (e = t[n]), (t[n] = t[n + 1]), (t[n + 1] = e);
    t.reversed = !t.reversed;
  }
  var A = {
    rect: "rx,ry,x,y,width,height",
    circle: "r,cx,cy",
    ellipse: "rx,ry,cx,cy",
    line: "x1,x2,y1,y2",
  };
  function convertToPath(t, e) {
    var n,
      r,
      o,
      a,
      i,
      s,
      h,
      l,
      c,
      g,
      f,
      u,
      p,
      d,
      P,
      m,
      _,
      v,
      w,
      y,
      x,
      M,
      T = t.tagName.toLowerCase(),
      b = 0.552284749831;
    return "path" !== T && t.getBBox
      ? ((s = (function _createPath(t, e) {
          var n,
            r = document.createElementNS("http://www.w3.org/2000/svg", "path"),
            o = [].slice.call(t.attributes),
            a = o.length;
          for (e = "," + e + ","; -1 < --a; )
            (n = o[a].nodeName.toLowerCase()),
              e.indexOf("," + n + ",") < 0 &&
                r.setAttributeNS(null, n, o[a].nodeValue);
          return r;
        })(t, "x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points")),
        (M = (function _attrToObj(t, e) {
          for (var n = e ? e.split(",") : [], r = {}, o = n.length; -1 < --o; )
            r[n[o]] = +t.getAttribute(n[o]) || 0;
          return r;
        })(t, A[T])),
        "rect" === T
          ? ((a = M.rx),
            (i = M.ry || a),
            (r = M.x),
            (o = M.y),
            (g = M.width - 2 * a),
            (f = M.height - 2 * i),
            (n =
              a || i
                ? "M" +
                  (m = (d = (p = r + a) + g) + a) +
                  "," +
                  (v = o + i) +
                  " V" +
                  (w = v + f) +
                  " C" +
                  [
                    m,
                    (y = w + i * b),
                    (P = d + a * b),
                    (x = w + i),
                    d,
                    x,
                    d - (d - p) / 3,
                    x,
                    p + (d - p) / 3,
                    x,
                    p,
                    x,
                    (u = r + a * (1 - b)),
                    x,
                    r,
                    y,
                    r,
                    w,
                    r,
                    w - (w - v) / 3,
                    r,
                    v + (w - v) / 3,
                    r,
                    v,
                    r,
                    (_ = o + i * (1 - b)),
                    u,
                    o,
                    p,
                    o,
                    p + (d - p) / 3,
                    o,
                    d - (d - p) / 3,
                    o,
                    d,
                    o,
                    P,
                    o,
                    m,
                    _,
                    m,
                    v,
                  ].join(",") +
                  "z"
                : "M" +
                  (r + g) +
                  "," +
                  o +
                  " v" +
                  f +
                  " h" +
                  -g +
                  " v" +
                  -f +
                  " h" +
                  g +
                  "z"))
          : "circle" === T || "ellipse" === T
          ? ((l =
              "circle" === T
                ? (a = i = M.r) * b
                : ((a = M.rx), (i = M.ry) * b)),
            (n =
              "M" +
              ((r = M.cx) + a) +
              "," +
              (o = M.cy) +
              " C" +
              [
                r + a,
                o + l,
                r + (h = a * b),
                o + i,
                r,
                o + i,
                r - h,
                o + i,
                r - a,
                o + l,
                r - a,
                o,
                r - a,
                o - l,
                r - h,
                o - i,
                r,
                o - i,
                r + h,
                o - i,
                r + a,
                o - l,
                r + a,
                o,
              ].join(",") +
              "z"))
          : "line" === T
          ? (n = "M" + M.x1 + "," + M.y1 + " L" + M.x2 + "," + M.y2)
          : ("polyline" !== T && "polygon" !== T) ||
            ((n =
              "M" +
              (r = (c =
                (t.getAttribute("points") + "").match(S) || []).shift()) +
              "," +
              (o = c.shift()) +
              " L" +
              c.join(",")),
            "polygon" === T && (n += "," + r + "," + o + "z")),
        s.setAttribute(
          "d",
          rawPathToString((s._gsRawPath = stringToRawPath(n)))
        ),
        e &&
          t.parentNode &&
          (t.parentNode.insertBefore(s, t), t.parentNode.removeChild(t)),
        s)
      : t;
  }
  function arcToSegment(t, e, n, r, o, a, i, s, h) {
    if (t !== s || e !== h) {
      (n = D(n)), (r = D(r));
      var l = (o % 360) * E,
        c = B(l),
        g = H(l),
        f = Math.PI,
        u = 2 * f,
        p = (t - s) / 2,
        d = (e - h) / 2,
        P = c * p + g * d,
        m = -g * p + c * d,
        _ = P * P,
        v = m * m,
        w = _ / (n * n) + v / (r * r);
      1 < w && ((n = Q(w) * n), (r = Q(w) * r));
      var y = n * n,
        x = r * r,
        M = (y * x - y * v - x * _) / (y * v + x * _);
      M < 0 && (M = 0);
      var T = (a === i ? -1 : 1) * Q(M),
        b = ((n * m) / r) * T,
        S = ((-r * P) / n) * T,
        z = c * b - g * S + (t + s) / 2,
        N = g * b + c * S + (e + h) / 2,
        A = (P - b) / n,
        R = (m - S) / r,
        O = (-P - b) / n,
        V = (-m - S) / r,
        j = A * A + R * R,
        C = (R < 0 ? -1 : 1) * Math.acos(A / Q(j)),
        Y =
          (A * V - R * O < 0 ? -1 : 1) *
          Math.acos((A * O + R * V) / Q(j * (O * O + V * V)));
      isNaN(Y) && (Y = f),
        !i && 0 < Y ? (Y -= u) : i && Y < 0 && (Y += u),
        (C %= u),
        (Y %= u);
      var I,
        L = Math.ceil(D(Y) / (u / 4)),
        U = [],
        F = Y / L,
        X = ((4 / 3) * H(F / 2)) / (1 + B(F / 2)),
        G = c * n,
        W = g * n,
        k = g * -r,
        q = c * r;
      for (I = 0; I < L; I++)
        (P = B((o = C + I * F))),
          (m = H(o)),
          (A = B((o += F))),
          (R = H(o)),
          U.push(P - X * m, m + X * P, A + X * R, R - X * A, A, R);
      for (I = 0; I < U.length; I += 2)
        (P = U[I]),
          (m = U[I + 1]),
          (U[I] = P * G + m * k + z),
          (U[I + 1] = P * W + m * q + N);
      return (U[I - 2] = s), (U[I - 1] = h), U;
    }
  }
  function stringToRawPath(t) {
    function zc(t, e, n, r) {
      (c = (n - t) / 3),
        (g = (r - e) / 3),
        s.push(t + c, e + g, n - c, r - g, n, r);
    }
    var e,
      n,
      r,
      o,
      a,
      i,
      s,
      h,
      l,
      c,
      g,
      f,
      u,
      p,
      d,
      P =
        (t + "")
          .replace(N, function (t) {
            var e = +t;
            return e < 1e-4 && -1e-4 < e ? 0 : e;
          })
          .match(b) || [],
      m = [],
      _ = 0,
      v = 0,
      w = P.length,
      y = 0,
      x = "ERROR: malformed path: " + t;
    if (!t || !isNaN(P[0]) || isNaN(P[1])) return console.log(x), m;
    for (e = 0; e < w; e++)
      if (
        ((u = a),
        isNaN(P[e]) ? (i = (a = P[e].toUpperCase()) !== P[e]) : e--,
        (r = +P[e + 1]),
        (o = +P[e + 2]),
        i && ((r += _), (o += v)),
        e || ((h = r), (l = o)),
        "M" === a)
      )
        s && (s.length < 8 ? --m.length : (y += s.length)),
          (_ = h = r),
          (v = l = o),
          (s = [r, o]),
          m.push(s),
          (e += 2),
          (a = "L");
      else if ("C" === a)
        i || (_ = v = 0),
          (s = s || [0, 0]).push(
            r,
            o,
            _ + 1 * P[e + 3],
            v + 1 * P[e + 4],
            (_ += 1 * P[e + 5]),
            (v += 1 * P[e + 6])
          ),
          (e += 6);
      else if ("S" === a)
        (c = _),
          (g = v),
          ("C" !== u && "S" !== u) ||
            ((c += _ - s[s.length - 4]), (g += v - s[s.length - 3])),
          i || (_ = v = 0),
          s.push(c, g, r, o, (_ += 1 * P[e + 3]), (v += 1 * P[e + 4])),
          (e += 4);
      else if ("Q" === a)
        (c = _ + (2 / 3) * (r - _)),
          (g = v + (2 / 3) * (o - v)),
          i || (_ = v = 0),
          (_ += 1 * P[e + 3]),
          (v += 1 * P[e + 4]),
          s.push(c, g, _ + (2 / 3) * (r - _), v + (2 / 3) * (o - v), _, v),
          (e += 4);
      else if ("T" === a)
        (c = _ - s[s.length - 4]),
          (g = v - s[s.length - 3]),
          s.push(
            _ + c,
            v + g,
            r + (2 / 3) * (_ + 1.5 * c - r),
            o + (2 / 3) * (v + 1.5 * g - o),
            (_ = r),
            (v = o)
          ),
          (e += 2);
      else if ("H" === a) zc(_, v, (_ = r), v), (e += 1);
      else if ("V" === a) zc(_, v, _, (v = r + (i ? v - _ : 0))), (e += 1);
      else if ("L" === a || "Z" === a)
        "Z" === a && ((r = h), (o = l), (s.closed = !0)),
          ("L" === a || 0.5 < D(_ - r) || 0.5 < D(v - o)) &&
            (zc(_, v, r, o), "L" === a && (e += 2)),
          (_ = r),
          (v = o);
      else if ("A" === a) {
        if (
          ((p = P[e + 4]),
          (d = P[e + 5]),
          (c = P[e + 6]),
          (g = P[e + 7]),
          (n = 7),
          1 < p.length &&
            (p.length < 3
              ? ((g = c), (c = d), n--)
              : ((g = d), (c = p.substr(2)), (n -= 2)),
            (d = p.charAt(1)),
            (p = p.charAt(0))),
          (f = arcToSegment(
            _,
            v,
            +P[e + 1],
            +P[e + 2],
            +P[e + 3],
            +p,
            +d,
            (i ? _ : 0) + 1 * c,
            (i ? v : 0) + 1 * g
          )),
          (e += n),
          f)
        )
          for (n = 0; n < f.length; n++) s.push(f[n]);
        (_ = s[s.length - 2]), (v = s[s.length - 1]);
      } else console.log(x);
    return (
      (e = s.length) < 6
        ? (m.pop(), (e = 0))
        : s[0] === s[e - 2] && s[1] === s[e - 1] && (s.closed = !0),
      (m.totalPoints = y + e),
      m
    );
  }
  function rawPathToString(t) {
    s(t[0]) && (t = [t]);
    var e,
      n,
      r,
      o,
      a = "",
      i = t.length;
    for (n = 0; n < i; n++) {
      for (
        o = t[n],
          a += "M" + h(o[0]) + "," + h(o[1]) + " C",
          e = o.length,
          r = 2;
        r < e;
        r++
      )
        a +=
          h(o[r++]) +
          "," +
          h(o[r++]) +
          " " +
          h(o[r++]) +
          "," +
          h(o[r++]) +
          " " +
          h(o[r++]) +
          "," +
          h(o[r]) +
          " ";
      o.closed && (a += "z");
    }
    return a;
  }
  function y() {
    return (
      a ||
      ("undefined" != typeof window &&
        (a = window.gsap) &&
        a.registerPlugin &&
        a)
    );
  }
  function z(t) {
    return "function" == typeof t;
  }
  function M(t) {
    return console && console.warn(t);
  }
  function P() {
    return String.fromCharCode.apply(null, arguments);
  }
  function T(t) {
    var e,
      n = t.length,
      r = 0,
      o = 0;
    for (e = 0; e < n; e++) (r += t[e++]), (o += t[e]);
    return [r / (n / 2), o / (n / 2)];
  }
  function U(t) {
    var e,
      n,
      r,
      o = t.length,
      a = t[0],
      i = a,
      s = t[1],
      h = s;
    for (r = 6; r < o; r += 6)
      a < (e = t[r]) ? (a = e) : e < i && (i = e),
        s < (n = t[r + 1]) ? (s = n) : n < h && (h = n);
    return (
      (t.centerX = (a + i) / 2),
      (t.centerY = (s + h) / 2),
      (t.size = (a - i) * (s - h))
    );
  }
  function V(t, e) {
    void 0 === e && (e = 3);
    for (
      var n,
        r,
        o,
        a,
        i,
        s,
        h,
        l,
        c,
        g,
        f,
        u,
        p,
        d,
        P,
        m,
        _ = t.length,
        v = t[0][0],
        w = v,
        y = t[0][1],
        x = y,
        M = 1 / e;
      -1 < --_;

    )
      for (n = (i = t[_]).length, a = 6; a < n; a += 6)
        for (
          c = i[a],
            g = i[a + 1],
            f = i[a + 2] - c,
            d = i[a + 3] - g,
            u = i[a + 4] - c,
            P = i[a + 5] - g,
            p = i[a + 6] - c,
            m = i[a + 7] - g,
            s = e;
          -1 < --s;

        )
          v <
          (r =
            ((h = M * s) * h * p + 3 * (l = 1 - h) * (h * u + l * f)) * h + c)
            ? (v = r)
            : r < w && (w = r),
            y < (o = (h * h * m + 3 * l * (h * P + l * d)) * h + g)
              ? (y = o)
              : o < x && (x = o);
    return (
      (t.centerX = (v + w) / 2),
      (t.centerY = (y + x) / 2),
      (t.left = w),
      (t.width = v - w),
      (t.top = x),
      (t.height = y - x),
      (t.size = (v - w) * (y - x))
    );
  }
  function W(t, e) {
    return e.length - t.length;
  }
  function X(t, e) {
    var n = t.size || U(t),
      r = e.size || U(e);
    return Math.abs(r - n) < (n + r) / 20
      ? e.centerX - t.centerX || e.centerY - t.centerY
      : r - n;
  }
  function Y(t, e) {
    var n,
      r,
      o = t.slice(0),
      a = t.length,
      i = a - 2;
    for (e |= 0, n = 0; n < a; n++)
      (r = (n + e) % i), (t[n++] = o[r]), (t[n] = o[1 + r]);
  }
  function Z(t, e, n, r, o) {
    var a,
      i,
      s,
      h,
      l = t.length,
      c = 0,
      g = l - 2;
    for (n *= 6, i = 0; i < l; i += 6)
      (h = t[(a = (i + n) % g)] - (e[i] - r)),
        (s = t[1 + a] - (e[i + 1] - o)),
        (c += v(s * s + h * h));
    return c;
  }
  function $(t, e, n) {
    var r,
      o,
      a,
      i = t.length,
      s = T(t),
      h = T(e),
      l = h[0] - s[0],
      c = h[1] - s[1],
      g = Z(t, e, 0, l, c),
      f = 0;
    for (a = 6; a < i; a += 6)
      (o = Z(t, e, a / 6, l, c)) < g && ((g = o), (f = a));
    if (n)
      for (reverseSegment((r = t.slice(0))), a = 6; a < i; a += 6)
        (o = Z(r, e, a / 6, l, c)) < g && ((g = o), (f = -a));
    return f / 6;
  }
  function _(t, e, n) {
    for (var r, o, a, i, s, h, l = t.length, c = 1e20, g = 0, f = 0; -1 < --l; )
      for (h = (r = t[l]).length, s = 0; s < h; s += 6)
        (o = r[s] - e),
          (a = r[s + 1] - n),
          (i = v(o * o + a * a)) < c && ((c = i), (g = r[s]), (f = r[s + 1]));
    return [g, f];
  }
  function aa(t, e, n, r, o, a) {
    var i,
      s,
      h,
      l,
      c = e.length,
      g = 0,
      f = Math.min(t.size || U(t), e[n].size || U(e[n])) * r,
      u = 1e20,
      p = t.centerX + o,
      d = t.centerY + a;
    for (i = n; i < c && !((e[i].size || U(e[i])) < f); i++)
      (s = e[i].centerX - p),
        (h = e[i].centerY - d),
        (l = v(s * s + h * h)) < u && ((g = i), (u = l));
    return (l = e[g]), e.splice(g, 1), l;
  }
  function ba(t, e) {
    var n,
      r,
      o,
      a,
      i,
      s,
      h,
      l,
      c,
      g,
      f,
      u,
      p,
      d,
      P = 0,
      m = t.length,
      _ = e / ((m - 2) / 6);
    for (p = 2; p < m; p += 6)
      for (P += _; 0.999999 < P; )
        (n = t[p - 2]),
          (r = t[p - 1]),
          (o = t[p]),
          (a = t[p + 1]),
          (i = t[p + 2]),
          (s = t[p + 3]),
          (h = t[p + 4]),
          (l = t[p + 5]),
          (c = n + (o - n) * (d = 1 / ((Math.floor(P) || 1) + 1))),
          (c += ((f = o + (i - o) * d) - c) * d),
          (f += (i + (h - i) * d - f) * d),
          (g = r + (a - r) * d),
          (g += ((u = a + (s - a) * d) - g) * d),
          (u += (s + (l - s) * d - u) * d),
          t.splice(
            p,
            4,
            n + (o - n) * d,
            r + (a - r) * d,
            c,
            g,
            c + (f - c) * d,
            g + (u - g) * d,
            f,
            u,
            i + (h - i) * d,
            s + (l - s) * d
          ),
          (p += 6),
          (m += 6),
          P--;
    return t;
  }
  function ca(t, e, n, r, o) {
    var a,
      i,
      s,
      h,
      l,
      c,
      g,
      f = e.length - t.length,
      u = 0 < f ? e : t,
      p = 0 < f ? t : e,
      d = 0,
      P = "complexity" === r ? W : X,
      m = "position" === r ? 0 : "number" == typeof r ? r : 0.8,
      v = p.length,
      w = "object" == typeof n && n.push ? n.slice(0) : [n],
      y = "reverse" === w[0] || w[0] < 0,
      x = "log" === n;
    if (p[0]) {
      if (
        1 < u.length &&
        (t.sort(P),
        e.sort(P),
        u.size || V(u),
        p.size || V(p),
        (c = u.centerX - p.centerX),
        (g = u.centerY - p.centerY),
        P === X)
      )
        for (v = 0; v < p.length; v++) u.splice(v, 0, aa(p[v], u, v, m, c, g));
      if (f)
        for (
          f < 0 && (f = -f),
            u[0].length > p[0].length &&
              ba(p[0], ((u[0].length - p[0].length) / 6) | 0),
            v = p.length;
          d < f;

        )
          u[v].size || U(u[v]),
            (h = (s = _(p, u[v].centerX, u[v].centerY))[0]),
            (l = s[1]),
            (p[v++] = [h, l, h, l, h, l, h, l]),
            (p.totalPoints += 8),
            d++;
      for (v = 0; v < t.length; v++)
        (a = e[v]),
          (i = t[v]),
          (f = a.length - i.length) < 0
            ? ba(a, (-f / 6) | 0)
            : 0 < f && ba(i, (f / 6) | 0),
          y && !1 !== o && !i.reversed && reverseSegment(i),
          (n = w[v] || 0 === w[v] ? w[v] : "auto") &&
            (i.closed ||
            (Math.abs(i[0] - i[i.length - 2]) < 0.5 &&
              Math.abs(i[1] - i[i.length - 1]) < 0.5)
              ? "auto" === n || "log" === n
                ? ((w[v] = n = $(i, a, !v || !1 === o)),
                  n < 0 && ((y = !0), reverseSegment(i), (n = -n)),
                  Y(i, 6 * n))
                : "reverse" !== n &&
                  (v && n < 0 && reverseSegment(i), Y(i, 6 * (n < 0 ? -n : n)))
              : !y &&
                (("auto" === n &&
                  Math.abs(a[0] - i[0]) +
                    Math.abs(a[1] - i[1]) +
                    Math.abs(a[a.length - 2] - i[i.length - 2]) +
                    Math.abs(a[a.length - 1] - i[i.length - 1]) >
                    Math.abs(a[0] - i[i.length - 2]) +
                      Math.abs(a[1] - i[i.length - 1]) +
                      Math.abs(a[a.length - 2] - i[0]) +
                      Math.abs(a[a.length - 1] - i[1])) ||
                  n % 2)
              ? (reverseSegment(i), (w[v] = -1), (y = !0))
              : "auto" === n
              ? (w[v] = 0)
              : "reverse" === n && (w[v] = -1),
            i.closed !== a.closed && (i.closed = a.closed = !1));
      return x && M("shapeIndex:[" + w.join(",") + "]"), (t.shapeIndex = w);
    }
  }
  function da(t, e, n, r, o) {
    var a = stringToRawPath(t[0]),
      i = stringToRawPath(t[1]);
    ca(a, i, e || 0 === e ? e : "auto", n, o) &&
      ((t[0] = rawPathToString(a)),
      (t[1] = rawPathToString(i)),
      ("log" !== r && !0 !== r) ||
        M('precompile:["' + t[0] + '","' + t[1] + '"]'));
  }
  function fa(t, e) {
    var n,
      r,
      o,
      a,
      i,
      s,
      h,
      l = 0,
      c = parseFloat(t[0]),
      g = parseFloat(t[1]),
      f = c + "," + g + " ";
    for (n = (0.5 * e) / (0.5 * (o = t.length) - 1), r = 0; r < o - 2; r += 2) {
      if (
        ((l += n),
        (s = parseFloat(t[r + 2])),
        (h = parseFloat(t[r + 3])),
        0.999999 < l)
      )
        for (i = 1 / (Math.floor(l) + 1), a = 1; 0.999999 < l; )
          (f +=
            (c + (s - c) * i * a).toFixed(2) +
            "," +
            (g + (h - g) * i * a).toFixed(2) +
            " "),
            l--,
            a++;
      (f += s + "," + h + " "), (c = s), (g = h);
    }
    return f;
  }
  function ga(t) {
    var e = t[0].match(F) || [],
      n = t[1].match(F) || [],
      r = n.length - e.length;
    0 < r ? (t[0] = fa(e, r)) : (t[1] = fa(n, -r));
  }
  function ha(e) {
    return isNaN(e)
      ? ga
      : function (t) {
          ga(t),
            (t[1] = (function _offsetPoints(t, e) {
              if (!e) return t;
              var n,
                r,
                o,
                a = t.match(F) || [],
                i = a.length,
                s = "";
              for (
                n =
                  "reverse" === e
                    ? ((r = i - 1), -2)
                    : ((r = (2 * (parseInt(e, 10) || 0) + 1 + 100 * i) % i), 2),
                  o = 0;
                o < i;
                o += 2
              )
                (s += a[r - 1] + "," + a[r] + " "), (r = (r + n) % i);
              return s;
            })(t[1], parseInt(e, 10)));
        };
  }
  function ja(t, e) {
    for (
      var n, r, o, a, i, s, h, l, c, g, f, u, p = t.length, d = 0.2 * (e || 1);
      -1 < --p;

    ) {
      for (
        f = (r = t[p]).isSmooth = r.isSmooth || [0, 0, 0, 0],
          u = r.smoothData = r.smoothData || [0, 0, 0, 0],
          f.length = 4,
          l = r.length - 2,
          h = 6;
        h < l;
        h += 6
      )
        (o = r[h] - r[h - 2]),
          (a = r[h + 1] - r[h - 1]),
          (i = r[h + 2] - r[h]),
          (s = r[h + 3] - r[h + 1]),
          (c = w(a, o)),
          (g = w(s, i)),
          (n = Math.abs(c - g) < d) &&
            ((u[h - 2] = c),
            (u[h + 2] = g),
            (u[h - 1] = v(o * o + a * a)),
            (u[h + 3] = v(i * i + s * s))),
          f.push(n, n, 0, 0, n, n);
      r[l] === r[0] &&
        r[1 + l] === r[1] &&
        ((o = r[0] - r[l - 2]),
        (a = r[1] - r[l - 1]),
        (i = r[2] - r[0]),
        (s = r[3] - r[1]),
        (c = w(a, o)),
        (g = w(s, i)),
        Math.abs(c - g) < d &&
          ((u[l - 2] = c),
          (u[2] = g),
          (u[l - 1] = v(o * o + a * a)),
          (u[3] = v(i * i + s * s)),
          (f[l - 2] = f[l - 1] = !0)));
    }
    return t;
  }
  function ka(t) {
    var e = t.trim().split(" ");
    return {
      x:
        (~t.indexOf("left")
          ? 0
          : ~t.indexOf("right")
          ? 100
          : isNaN(parseFloat(e[0]))
          ? 50
          : parseFloat(e[0])) / 100,
      y:
        (~t.indexOf("top")
          ? 0
          : ~t.indexOf("bottom")
          ? 100
          : isNaN(parseFloat(e[1]))
          ? 50
          : parseFloat(e[1])) / 100,
    };
  }
  function na(t, e, n, r) {
    var o,
      a,
      i = this._origin,
      s = this._eOrigin,
      h = t[n] - i.x,
      l = t[n + 1] - i.y,
      c = v(h * h + l * l),
      g = w(l, h);
    return (
      (h = e[n] - s.x),
      (l = e[n + 1] - s.y),
      (a = (function _shortAngle(t) {
        return t !== t % f ? t + (t < 0 ? u : -u) : t;
      })((o = w(l, h) - g))),
      !r && I && Math.abs(a + I.ca) < p && (r = I),
      (this._anchorPT = I =
        {
          _next: this._anchorPT,
          t: t,
          sa: g,
          ca: r && a * r.ca < 0 && Math.abs(a) > d ? o : a,
          sl: c,
          cl: v(h * h + l * l) - c,
          i: n,
        })
    );
  }
  function oa(t) {
    (a = y()),
      (n = n || (a && a.plugins.morphSVG)),
      a && n
        ? ((C = a.utils.toArray), (n.prototype._tweenRotation = na), (L = 1))
        : t && M("Please gsap.registerPlugin(MorphSVGPlugin)");
  }
  var a,
    C,
    I,
    L,
    n,
    w = Math.atan2,
    x = Math.cos,
    R = Math.sin,
    v = Math.sqrt,
    f = Math.PI,
    u = 2 * f,
    p = 0.3 * f,
    d = 0.7 * f,
    F = /[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,
    G = /(^[#\.][a-z]|[a-y][a-z])/i,
    k = /[achlmqstvz]/i,
    i = "MorphSVGPlugin",
    l = P(103, 114, 101, 101, 110, 115, 111, 99, 107, 46, 99, 111, 109),
    c = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}:?\d*$/,
    q = (function (t) {
      var e = "undefined" != typeof window,
        n =
          0 ===
            (e ? window.location.href : "").indexOf(
              P(102, 105, 108, 101, 58, 47, 47)
            ) ||
          -1 !== t.indexOf(P(108, 111, 99, 97, 108, 104, 111, 115, 116)) ||
          c.test(t),
        r = [
          l,
          P(99, 111, 100, 101, 112, 101, 110, 46, 105, 111),
          P(
            99,
            111,
            100,
            101,
            112,
            101,
            110,
            46,
            112,
            108,
            117,
            109,
            98,
            105,
            110,
            103
          ),
          P(99, 111, 100, 101, 112, 101, 110, 46, 100, 101, 118),
          P(99, 111, 100, 101, 112, 101, 110, 46, 97, 112, 112),
          P(
            99,
            111,
            100,
            101,
            112,
            101,
            110,
            46,
            119,
            101,
            98,
            115,
            105,
            116,
            101
          ),
          P(112, 101, 110, 115, 46, 99, 108, 111, 117, 100),
          P(99, 115, 115, 45, 116, 114, 105, 99, 107, 115, 46, 99, 111, 109),
          P(99, 100, 112, 110, 46, 105, 111),
          P(112, 101, 110, 115, 46, 105, 111),
          P(103, 97, 110, 110, 111, 110, 46, 116, 118),
          P(99, 111, 100, 101, 99, 97, 110, 121, 111, 110, 46, 110, 101, 116),
          P(
            116,
            104,
            101,
            109,
            101,
            102,
            111,
            114,
            101,
            115,
            116,
            46,
            110,
            101,
            116
          ),
          P(99, 101, 114, 101, 98, 114, 97, 120, 46, 99, 111, 46, 117, 107),
          P(116, 121, 109, 112, 97, 110, 117, 115, 46, 110, 101, 116),
          P(116, 119, 101, 101, 110, 109, 97, 120, 46, 99, 111, 109),
          P(112, 108, 110, 107, 114, 46, 99, 111),
          P(104, 111, 116, 106, 97, 114, 46, 99, 111, 109),
          P(119, 101, 98, 112, 97, 99, 107, 98, 105, 110, 46, 99, 111, 109),
          P(97, 114, 99, 104, 105, 118, 101, 46, 111, 114, 103),
          P(99, 111, 100, 101, 115, 97, 110, 100, 98, 111, 120, 46, 105, 111),
          P(99, 115, 98, 46, 97, 112, 112),
          P(115, 116, 97, 99, 107, 98, 108, 105, 116, 122, 46, 99, 111, 109),
          P(115, 116, 97, 99, 107, 98, 108, 105, 116, 122, 46, 105, 111),
          P(99, 111, 100, 105, 101, 114, 46, 105, 111),
          P(
            109,
            111,
            116,
            105,
            111,
            110,
            116,
            114,
            105,
            99,
            107,
            115,
            46,
            99,
            111,
            109
          ),
          P(
            115,
            116,
            97,
            99,
            107,
            111,
            118,
            101,
            114,
            102,
            108,
            111,
            119,
            46,
            99,
            111,
            109
          ),
          P(
            115,
            116,
            97,
            99,
            107,
            101,
            120,
            99,
            104,
            97,
            110,
            103,
            101,
            46,
            99,
            111,
            109
          ),
          P(
            115,
            116,
            117,
            100,
            105,
            111,
            102,
            114,
            101,
            105,
            103,
            104,
            116,
            46,
            99,
            111,
            109
          ),
          P(
            119,
            101,
            98,
            99,
            111,
            110,
            116,
            97,
            105,
            110,
            101,
            114,
            46,
            105,
            111
          ),
          P(118, 101, 114, 99, 101, 108, 46, 97, 112, 112),
          P(110, 101, 116, 108, 105, 102, 121, 46, 97, 112, 112),
          P(106, 115, 102, 105, 100, 100, 108, 101, 46, 110, 101, 116),
        ],
        o = r.length;
      for (
        setTimeout(function checkWarn() {
          if (e)
            if (
              "loading" === document.readyState ||
              "interactive" === document.readyState
            )
              document.addEventListener("readystatechange", checkWarn);
            else {
              document.removeEventListener("readystatechange", checkWarn);
              var t = "object" == typeof a ? a : e && window.gsap;
              e &&
                window.console &&
                !window._gsapWarned &&
                "object" == typeof t &&
                !1 !== t.config().trialWarn &&
                (console.log(
                  P(37, 99, 87, 97, 114, 110, 105, 110, 103),
                  P(
                    102,
                    111,
                    110,
                    116,
                    45,
                    115,
                    105,
                    122,
                    101,
                    58,
                    51,
                    48,
                    112,
                    120,
                    59,
                    99,
                    111,
                    108,
                    111,
                    114,
                    58,
                    114,
                    101,
                    100,
                    59
                  )
                ),
                console.log(
                  P(
                    65,
                    32,
                    116,
                    114,
                    105,
                    97,
                    108,
                    32,
                    118,
                    101,
                    114,
                    115,
                    105,
                    111,
                    110,
                    32,
                    111,
                    102,
                    32
                  ) +
                    i +
                    P(
                      32,
                      105,
                      115,
                      32,
                      108,
                      111,
                      97,
                      100,
                      101,
                      100,
                      32,
                      116,
                      104,
                      97,
                      116,
                      32,
                      111,
                      110,
                      108,
                      121,
                      32,
                      119,
                      111,
                      114,
                      107,
                      115,
                      32,
                      108,
                      111,
                      99,
                      97,
                      108,
                      108,
                      121,
                      32,
                      97,
                      110,
                      100,
                      32,
                      111,
                      110,
                      32,
                      100,
                      111,
                      109,
                      97,
                      105,
                      110,
                      115,
                      32,
                      108,
                      105,
                      107,
                      101,
                      32,
                      99,
                      111,
                      100,
                      101,
                      112,
                      101,
                      110,
                      46,
                      105,
                      111,
                      32,
                      97,
                      110,
                      100,
                      32,
                      99,
                      111,
                      100,
                      101,
                      115,
                      97,
                      110,
                      100,
                      98,
                      111,
                      120,
                      46,
                      105,
                      111,
                      46,
                      32,
                      42,
                      42,
                      42,
                      32,
                      68,
                      79,
                      32,
                      78,
                      79,
                      84,
                      32,
                      68,
                      69,
                      80,
                      76,
                      79,
                      89,
                      32,
                      84,
                      72,
                      73,
                      83,
                      32,
                      70,
                      73,
                      76,
                      69,
                      32,
                      42,
                      42,
                      42,
                      32,
                      76,
                      111,
                      97,
                      100,
                      105,
                      110,
                      103,
                      32,
                      105,
                      116,
                      32,
                      111,
                      110,
                      32,
                      97,
                      110,
                      32,
                      117,
                      110,
                      97,
                      117,
                      116,
                      104,
                      111,
                      114,
                      105,
                      122,
                      101,
                      100,
                      32,
                      115,
                      105,
                      116,
                      101,
                      32,
                      118,
                      105,
                      111,
                      108,
                      97,
                      116,
                      101,
                      115,
                      32,
                      116,
                      104,
                      101,
                      32,
                      108,
                      105,
                      99,
                      101,
                      110,
                      115,
                      101,
                      32,
                      97,
                      110,
                      100,
                      32,
                      119,
                      105,
                      108,
                      108,
                      32,
                      99,
                      97,
                      117,
                      115,
                      101,
                      32,
                      97,
                      32,
                      114,
                      101,
                      100,
                      105,
                      114,
                      101,
                      99,
                      116,
                      46,
                      32,
                      80,
                      108,
                      101,
                      97,
                      115,
                      101,
                      32,
                      106,
                      111,
                      105,
                      110,
                      32,
                      67,
                      108,
                      117,
                      98,
                      32,
                      71,
                      114,
                      101,
                      101,
                      110,
                      83,
                      111,
                      99,
                      107,
                      32,
                      116,
                      111,
                      32,
                      103,
                      101,
                      116,
                      32,
                      102,
                      117,
                      108,
                      108,
                      32,
                      97,
                      99,
                      99,
                      101,
                      115,
                      115,
                      32,
                      116,
                      111,
                      32,
                      116,
                      104,
                      101,
                      32,
                      98,
                      111,
                      110,
                      117,
                      115,
                      32,
                      112,
                      108,
                      117,
                      103,
                      105,
                      110,
                      115,
                      32,
                      116,
                      104,
                      97,
                      116,
                      32,
                      98,
                      111,
                      111,
                      115,
                      116,
                      32,
                      121,
                      111,
                      117,
                      114,
                      32,
                      97,
                      110,
                      105,
                      109,
                      97,
                      116,
                      105,
                      111,
                      110,
                      32,
                      115,
                      117,
                      112,
                      101,
                      114,
                      112,
                      111,
                      119,
                      101,
                      114,
                      115,
                      46,
                      32,
                      68,
                      105,
                      115,
                      97,
                      98,
                      108,
                      101,
                      32,
                      116,
                      104,
                      105,
                      115,
                      32,
                      119,
                      97,
                      114,
                      110,
                      105,
                      110,
                      103,
                      32,
                      119,
                      105,
                      116,
                      104,
                      32,
                      103,
                      115,
                      97,
                      112,
                      46,
                      99,
                      111,
                      110,
                      102,
                      105,
                      103,
                      40,
                      123,
                      116,
                      114,
                      105,
                      97,
                      108,
                      87,
                      97,
                      114,
                      110,
                      58,
                      32,
                      102,
                      97,
                      108,
                      115,
                      101,
                      125,
                      41,
                      59
                    )
                ),
                console.log(
                  P(
                    37,
                    99,
                    71,
                    101,
                    116,
                    32,
                    117,
                    110,
                    114,
                    101,
                    115,
                    116,
                    114,
                    105,
                    99,
                    116,
                    101,
                    100,
                    32,
                    102,
                    105,
                    108,
                    101,
                    115,
                    32,
                    97,
                    116,
                    32,
                    104,
                    116,
                    116,
                    112,
                    115,
                    58,
                    47,
                    47,
                    103,
                    114,
                    101,
                    101,
                    110,
                    115,
                    111,
                    99,
                    107,
                    46,
                    99,
                    111,
                    109,
                    47,
                    99,
                    108,
                    117,
                    98
                  ),
                  P(
                    102,
                    111,
                    110,
                    116,
                    45,
                    115,
                    105,
                    122,
                    101,
                    58,
                    49,
                    54,
                    112,
                    120,
                    59,
                    99,
                    111,
                    108,
                    111,
                    114,
                    58,
                    35,
                    52,
                    101,
                    57,
                    56,
                    49,
                    53
                  )
                ),
                (window._gsapWarned = 1));
            }
        }, 50);
        -1 < --o;

      )
        if (-1 !== t.indexOf(r[o])) return !0;
      return (
        n ||
        !setTimeout(function () {
          e &&
            (window.location.href =
              P(104, 116, 116, 112, 115, 58, 47, 47) +
              l +
              P(
                47,
                114,
                101,
                113,
                117,
                105,
                114,
                101,
                115,
                45,
                109,
                101,
                109,
                98,
                101,
                114,
                115,
                104,
                105,
                112,
                47
              ) +
              "?plugin=" +
              i +
              "&source=trial");
        }, 4e3)
      );
    })("undefined" != typeof window ? window.location.host : ""),
    J =
      "Use MorphSVGPlugin.convertToPath() to convert to a path before morphing.",
    K = {
      version: "3.11.6",
      name: "morphSVG",
      rawVars: 1,
      register: function register(t, e) {
        (a = t), (n = e), oa();
      },
      init: function init(t, e, n, r, o) {
        if ((L || oa(1), !e)) return M("invalid shape"), !1;
        var a, i, s, h, l, c, g, f, u, p, d, P, m, _, v, w, y, x, T, b, S, N;
        if (
          (z(e) && (e = e.call(n, r, t, o)),
          "string" == typeof e || e.getBBox || e[0])
        )
          e = { shape: e };
        else if ("object" == typeof e) {
          for (i in ((a = {}), e))
            a[i] = z(e[i]) && "render" !== i ? e[i].call(n, r, t, o) : e[i];
          e = a;
        }
        var A = t.nodeType ? window.getComputedStyle(t) : {},
          R = A.fill + "",
          O = !(
            "none" === R ||
            "0" === (R.match(F) || [])[3] ||
            "evenodd" === A.fillRule
          ),
          j = (e.origin || "50 50").split(",");
        if (
          ((l =
            "POLYLINE" === (a = (t.nodeName + "").toUpperCase()) ||
            "POLYGON" === a),
          "PATH" !== a && !l && !e.prop)
        )
          return M("Cannot morph a <" + a + "> element. " + J), !1;
        if (
          ((i = "PATH" === a ? "d" : "points"), !e.prop && !z(t.setAttribute))
        )
          return !1;
        if (
          ((h = (function _parseShape(t, e, n) {
            var r, o;
            return (
              (!("string" == typeof t) ||
                G.test(t) ||
                (t.match(F) || []).length < 3) &&
                ((r = C(t)[0])
                  ? ((o = (r.nodeName + "").toUpperCase()),
                    e &&
                      "PATH" !== o &&
                      ((r = convertToPath(r, !1)), (o = "PATH")),
                    (t = r.getAttribute("PATH" === o ? "d" : "points") || ""),
                    r === n &&
                      (t = r.getAttributeNS(null, "data-original") || t))
                  : (M("WARNING: invalid morph to: " + t), (t = !1))),
              t
            );
          })(e.shape || e.d || e.points || "", "d" === i, t)),
          l && k.test(h))
        )
          return M("A <" + a + "> cannot accept path data. " + J), !1;
        if (
          ((c = e.shapeIndex || 0 === e.shapeIndex ? e.shapeIndex : "auto"),
          (g = e.map || K.defaultMap),
          (this._prop = e.prop),
          (this._render = e.render || K.defaultRender),
          (this._apply =
            "updateTarget" in e ? e.updateTarget : K.defaultUpdateTarget),
          (this._rnd = Math.pow(10, isNaN(e.precision) ? 2 : +e.precision)),
          (this._tween = n),
          h)
        ) {
          if (
            ((this._target = t),
            (y = "object" == typeof e.precompile),
            (p = this._prop ? t[this._prop] : t.getAttribute(i)),
            this._prop ||
              t.getAttributeNS(null, "data-original") ||
              t.setAttributeNS(null, "data-original", p),
            "d" === i || this._prop)
          ) {
            if (
              ((p = stringToRawPath(y ? e.precompile[0] : p)),
              (d = stringToRawPath(y ? e.precompile[1] : h)),
              !y && !ca(p, d, c, g, O))
            )
              return !1;
            for (
              ("log" !== e.precompile && !0 !== e.precompile) ||
                M(
                  'precompile:["' +
                    rawPathToString(p) +
                    '","' +
                    rawPathToString(d) +
                    '"]'
                ),
                (S = "linear" !== (e.type || K.defaultType)) &&
                  ((p = ja(p, e.smoothTolerance)),
                  (d = ja(d, e.smoothTolerance)),
                  p.size || V(p),
                  d.size || V(d),
                  (b = ka(j[0])),
                  (this._origin = p.origin =
                    { x: p.left + b.x * p.width, y: p.top + b.y * p.height }),
                  j[1] && (b = ka(j[1])),
                  (this._eOrigin = {
                    x: d.left + b.x * d.width,
                    y: d.top + b.y * d.height,
                  })),
                this._rawPath = t._gsRawPath = p,
                m = p.length;
              -1 < --m;

            )
              for (
                v = p[m],
                  w = d[m],
                  f = v.isSmooth || [],
                  u = w.isSmooth || [],
                  _ = v.length,
                  P = I = 0;
                P < _;
                P += 2
              )
                (w[P] === v[P] && w[P + 1] === v[P + 1]) ||
                  (S
                    ? f[P] && u[P]
                      ? ((x = v.smoothData),
                        (T = w.smoothData),
                        (N = P + (P === _ - 4 ? 7 - _ : 5)),
                        (this._controlPT = {
                          _next: this._controlPT,
                          i: P,
                          j: m,
                          l1s: x[P + 1],
                          l1c: T[P + 1] - x[P + 1],
                          l2s: x[N],
                          l2c: T[N] - x[N],
                        }),
                        (s = this._tweenRotation(v, w, P + 2)),
                        this._tweenRotation(v, w, P, s),
                        this._tweenRotation(v, w, N - 1, s),
                        (P += 4))
                      : this._tweenRotation(v, w, P)
                    : ((s = this.add(v, P, v[P], w[P], 0, 0, 0, 0, 0, 1)),
                      (s =
                        this.add(
                          v,
                          P + 1,
                          v[P + 1],
                          w[P + 1],
                          0,
                          0,
                          0,
                          0,
                          0,
                          1
                        ) || s)));
          } else
            s = this.add(
              t,
              "setAttribute",
              t.getAttribute(i) + "",
              h + "",
              r,
              o,
              0,
              ha(c),
              i
            );
          S &&
            (this.add(
              this._origin,
              "x",
              this._origin.x,
              this._eOrigin.x,
              0,
              0,
              0,
              0,
              0,
              1
            ),
            (s = this.add(
              this._origin,
              "y",
              this._origin.y,
              this._eOrigin.y,
              0,
              0,
              0,
              0,
              0,
              1
            ))),
            s && (this._props.push("morphSVG"), (s.end = h), (s.endProp = i));
        }
        return q;
      },
      render: function render(t, e) {
        for (
          var n,
            r,
            o,
            a,
            i,
            s,
            h,
            l,
            c,
            g,
            f,
            u,
            p = e._rawPath,
            d = e._controlPT,
            P = e._anchorPT,
            m = e._rnd,
            _ = e._target,
            v = e._pt;
          v;

        )
          v.r(t, v.d), (v = v._next);
        if (1 === t && e._apply)
          for (v = e._pt; v; )
            v.end &&
              (e._prop
                ? (_[e._prop] = v.end)
                : _.setAttribute(v.endProp, v.end)),
              (v = v._next);
        else if (p) {
          for (; P; )
            (i = P.sa + t * P.ca),
              (a = P.sl + t * P.cl),
              (P.t[P.i] = e._origin.x + x(i) * a),
              (P.t[P.i + 1] = e._origin.y + R(i) * a),
              (P = P._next);
          for (r = t < 0.5 ? 2 * t * t : (4 - 2 * t) * t - 1; d; )
            (u =
              (s = d.i) + (s === (o = p[d.j]).length - 4 ? 7 - o.length : 5)),
              (i = w(o[u] - o[s + 1], o[u - 1] - o[s])),
              (g = R(i)),
              (f = x(i)),
              (l = o[s + 2]),
              (c = o[s + 3]),
              (a = d.l1s + r * d.l1c),
              (o[s] = l - f * a),
              (o[s + 1] = c - g * a),
              (a = d.l2s + r * d.l2c),
              (o[u - 1] = l + f * a),
              (o[u] = c + g * a),
              (d = d._next);
          if (((_._gsRawPath = p), e._apply)) {
            for (n = "", h = 0; h < p.length; h++)
              for (
                a = (o = p[h]).length,
                  n +=
                    "M" +
                    ((o[0] * m) | 0) / m +
                    " " +
                    ((o[1] * m) | 0) / m +
                    " C",
                  s = 2;
                s < a;
                s++
              )
                n += ((o[s] * m) | 0) / m + " ";
            e._prop ? (_[e._prop] = n) : _.setAttribute("d", n);
          }
        }
        e._render && p && e._render.call(e._tween, p, _);
      },
      kill: function kill() {
        this._pt = this._rawPath = 0;
      },
      getRawPath: function getRawPath(t) {
        var e,
          n = (t = (m(t) && r.test(t) && document.querySelector(t)) || t)
            .getAttribute
            ? t
            : 0;
        return n && (t = t.getAttribute("d"))
          ? (n._gsPath || (n._gsPath = {}),
            (e = n._gsPath[t]) && !e._dirty
              ? e
              : (n._gsPath[t] = stringToRawPath(t)))
          : t
          ? m(t)
            ? stringToRawPath(t)
            : s(t[0])
            ? [t]
            : t
          : console.warn(
              "Expecting a <path> element or an SVG path data string"
            );
      },
      stringToRawPath: stringToRawPath,
      rawPathToString: rawPathToString,
      normalizeStrings: function normalizeStrings(t, e, n) {
        var r = n.shapeIndex,
          o = n.map,
          a = [t, e];
        return da(a, r, o), a;
      },
      pathFilter: da,
      pointsFilter: ga,
      getTotalSize: V,
      equalizeSegmentQuantity: ca,
      convertToPath: function convertToPath$1(t, e) {
        return C(t).map(function (t) {
          return convertToPath(t, !1 !== e);
        });
      },
      defaultType: "linear",
      defaultUpdateTarget: !0,
      defaultMap: "size",
    };
  y() && a.registerPlugin(K), (t.MorphSVGPlugin = K), (t.default = K);
  if (typeof window === "undefined" || window !== t) {
    Object.defineProperty(t, "__esModule", { value: !0 });
  } else {
    delete t.default;
  }
});
