---
title: "Introduction à RSA — Mathématiques et Attaques"
date: "2024-11-10"
description: "Un tour complet de l'algorithme RSA : génération de clés, chiffrement, déchiffrement, et les attaques classiques (Wiener, Coppersmith, factorisation)."
tags: ["cryptography", "RSA", "math", "CTF"]
---

# Introduction à RSA

RSA (Rivest–Shamir–Adleman) est l'algorithme de chiffrement asymétrique le plus utilisé au monde. Comprendre ses fondements mathématiques est essentiel pour tout crypto-challenger.

## Génération des clés

On choisit deux grands premiers $p$ et $q$, puis on calcule :

$$
n = p \cdot q
$$

L'indicatrice d'Euler :

$$
\phi(n) = (p-1)(q-1)
$$

On choisit $e$ tel que $\gcd(e, \phi(n)) = 1$, et on calcule $d$ tel que :

$$
d \equiv e^{-1} \pmod{\phi(n)}
$$

La **clé publique** est $(n, e)$ et la **clé privée** est $(n, d)$.

## Chiffrement et Déchiffrement

Pour chiffrer un message $m$ :

$$
c \equiv m^e \pmod{n}
$$

Pour déchiffrer :

$$
m \equiv c^d \pmod{n}
$$

Cela fonctionne grâce au **petit théorème de Fermat** et sa généralisation par Euler :

$$
m^{\phi(n)} \equiv 1 \pmod{n}
$$

Donc :

$$
c^d \equiv m^{ed} \equiv m^{1 + k\phi(n)} \equiv m \pmod{n}
$$

## Attaque de Wiener

Quand $d$ est trop petit ($d < n^{1/4}/3$), l'attaque de Wiener récupère $d$ via les **fractions continues** de $e/n$.

On développe $e/n$ en fraction continue :

$$
\frac{e}{n} = a_0 + \cfrac{1}{a_1 + \cfrac{1}{a_2 + \cdots}}
$$

Parmi les convergents $k/d$ de cette fraction continue, il en existe un tel que :

$$
\left| \frac{e}{n} - \frac{k}{d} \right| < \frac{1}{2d^2}
$$

En testant chaque convergent, on peut vérifier si $\phi(n) = (ed - 1)/k$ est entier et si les racines de $x^2 - (n - \phi(n) + 1)x + n = 0$ sont entières (ce seraient $p$ et $q$).

```python
from fractions import Fraction
from math import isqrt

def wiener_attack(e, n):
    cf = continued_fraction(e, n)
    convergents = get_convergents(cf)
    for k, d in convergents:
        if k == 0:
            continue
        if (e * d - 1) % k != 0:
            continue
        phi = (e * d - 1) // k
        # Résoudre x^2 - (n - phi + 1)x + n = 0
        b = n - phi + 1
        disc = b * b - 4 * n
        if disc < 0:
            continue
        sqrt_disc = isqrt(disc)
        if sqrt_disc * sqrt_disc == disc:
            return d
    return None
```

## Attaque de Coppersmith (Low Public Exponent)

Si $e$ est petit (typiquement $e = 3$) et le padding est absent ou insuffisant, et si le même message $m$ est chiffré avec $e$ clés différentes $(n_1, e), (n_2, e), (n_3, e)$ :

$$
c_1 \equiv m^3 \pmod{n_1}, \quad c_2 \equiv m^3 \pmod{n_2}, \quad c_3 \equiv m^3 \pmod{n_3}
$$

Par le **Théorème des restes chinois (CRT)** :

$$
M \equiv m^3 \pmod{n_1 n_2 n_3}
$$

Si $m < \min(n_i)^{1/3}$, alors $m^3 < n_1 n_2 n_3$ et on récupère $m$ en calculant simplement $\lfloor M^{1/3} \rfloor$.

## Conclusion

RSA reste sûr si et seulement si :
- $n$ est assez grand ($\geq 2048$ bits)
- $d$ est grand (pas d'attaque Wiener)
- $e = 65537$ (valeur standard)
- Le padding OAEP est utilisé

Dans les CTF, on rencontre souvent des clés mal générées avec ces failles. La maîtrise de ces attaques est indispensable sur CryptoHack.
