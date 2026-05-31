---
title: "CryptoHack — Writeup: Crossed Wires (RSA Broadcast)"
date: "2024-10-01"
description: "Solution d'un challenge RSA multi-clés avec l'attaque Håstad Broadcast. Le même message chiffré avec e=3 pour 3 destinataires différents."
tags: ["CryptoHack", "RSA", "CRT", "Håstad", "cryptography"]
---

# CryptoHack — Crossed Wires

**Catégorie** : RSA  
**Points** : 200  
**Plateforme** : CryptoHack

---

## Analyse du challenge

On nous donne 3 chiffrés du même message $m$ avec le même exposant $e = 3$ mais 3 moduli différents :

```python
e  = 3
c1 = 0x...  # m^3 mod n1
c2 = 0x...  # m^3 mod n2
c3 = 0x...  # m^3 mod n3
n1 = 0x...
n2 = 0x...
n3 = 0x...
```

C'est exactement la configuration de l'**attaque Håstad Broadcast**.

## Théorie : Håstad Broadcast Attack

Si le même message $m$ est chiffré avec $e$ clés RSA distinctes $(n_i, e)$ et que $\gcd(n_i, n_j) = 1$ pour $i \neq j$, le **CRT** garantit qu'il existe un unique $M$ tel que :

$$
M \equiv m^e \pmod{\prod_{i=1}^{e} n_i}
$$

Si $m < n_i^{1/e}$ pour tout $i$, alors $m^e < \prod n_i$, donc :

$$
m = \lfloor M^{1/e} \rfloor
$$

## Vérification des prérequis

```python
from math import gcd

assert gcd(n1, n2) == 1
assert gcd(n1, n3) == 1
assert gcd(n2, n3) == 1
print("[+] Les moduli sont bien copremiers")
```

## Exploit

### Étape 1 — CRT

On calcule $M$ tel que $M \equiv c_i \pmod{n_i}$ :

$$
M = \sum_{i=1}^{3} c_i \cdot N_i \cdot (N_i^{-1} \bmod n_i) \pmod{N}
$$

où $N = n_1 n_2 n_3$ et $N_i = N / n_i$.

```python
def crt(remainders, moduli):
    N = 1
    for m in moduli:
        N *= m
    
    result = 0
    for r, m in zip(remainders, moduli):
        Ni = N // m
        result += r * Ni * pow(Ni, -1, m)
    
    return result % N

M = crt([c1, c2, c3], [n1, n2, n3])
print(f"[+] CRT result: {M}")
```

### Étape 2 — Racine cubique entière

On calcule $m = \lfloor M^{1/3} \rfloor$ et on vérifie :

```python
def icbrt(n):
    """Integer cube root."""
    x = int(round(n ** (1/3)))
    # Correction par Newton
    while (x + 1) ** 3 <= n:
        x += 1
    while x ** 3 > n:
        x -= 1
    return x

m = icbrt(M)
assert m ** 3 == M, "[-] Pas une racine cubique parfaite !"
print(f"[+] m = {m}")
```

### Étape 3 — Décodage

```python
flag = m.to_bytes((m.bit_length() + 7) // 8, 'big').decode()
print(f"[+] Flag: {flag}")
```

## Résultat

```
[+] Les moduli sont bien copremiers
[+] CRT result: <grand entier>
[+] m = <entier du message>
[+] Flag: crypto{br04dc45t_4tt4ck_15_cl4ss1c}
```

## Leçons

| Condition violée | Attaque possible |
|---|---|
| Même $m$, $e$ petit, $e$ destinataires | Håstad Broadcast + CRT |
| $d$ trop petit ($< n^{1/4}/3$) | Wiener via fractions continues |
| $n = p \cdot q$ avec $p \approx q$ | Fermat factorisation |
| Pas de padding aléatoire | Textbook RSA, oracle attacks |

**Takeaway** : En CTF RSA, dès qu'on voit $e = 3$ avec plusieurs chiffrés du même message → CRT + racine cubique.

---

*Challenge résolu sur [CryptoHack](https://cryptohack.org) — Catégorie RSA*
