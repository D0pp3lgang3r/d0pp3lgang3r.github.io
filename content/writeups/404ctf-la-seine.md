---
title: "404CTF — La Seine"
date: "2024-05-01"
tags: ["cryptography", "linear-algebra", "matrix", "diophantine"]
description: "Breaking a custom matrix-based signature scheme by exploiting the algebraic structure of its recurrence relation and solving a Diophantine equation."
---

## Challenge

```python
from Crypto.Util.number import *
import os
from secret import flag

class LaSeine:
    def __init__(self, size):
        self.l = 20
        self.p = getStrongPrime(size)

        self.a = getRandomNBitInteger(size // 16)
        self.b = getRandomNBitInteger(size // 16)

    def split(self, f):
        if len(f) & 1:
            f += b"\x00"
        h = len(f) // 2
        return (bytes_to_long(f[:h]), bytes_to_long(f[h:]))

    def sign(self, m, b):
        xn, yn = self.split(m)
        k = (getRandomNBitInteger(self.l - 1) << 1) + b

        for _ in range(k):
            xnp1 = (self.a*xn + self.b*yn) % self.p
            ynp1 = (self.b*xn - self.a*yn) % self.p

            xn, yn = xnp1, ynp1
        return (k, xn, yn)

seine = LaSeine(1024)

_, xf, yf = seine.sign(flag, 1)
s2 = seine.sign(b"L'eau est vraiment froide par ici (et pas tres propre)", 0)
# (k, x0, y0, xk, yk)
f = open("out.txt", "w")

f.write(str(seine.p) + "\n")
f.write(str((xf, yf)) + "\n")
f.write(str(s2))

f.close()
```

## Solution

The output gives us two signatures. For the second one we know both the input message (which we can split into $x_0$, $y_0$) and $k$. Our first goal is therefore to recover $a$ and $b$ given $k$, $x_0$, $y_0$, and $p$.

The loop runs $k$ times, applying the same linear recurrence at each step. Writing out the first few iterations:

$$
\begin{align*}
x_1 &= ax_0 + by_0 \pmod{p}\\
y_1 &= bx_0 - ay_0 \pmod{p}
\end{align*}
$$

$$
\begin{align*}
x_2 &= ax_1 + by_1 = a(ax_0 + by_0) + b(bx_0 - ay_0) = (a^2 + b^2)x_0 \pmod{p}\\
y_2 &= bx_1 - ay_1 = b(ax_0 + by_0) - a(bx_0 - ay_0) = (a^2 + b^2)y_0 \pmod{p}
\end{align*}
$$

$$
\begin{align*}
x_3 &= ax_2 + by_2 = a(a^2 + b^2)x_0 + b(a^2 + b^2)y_0 \pmod{p}\\
y_3 &= bx_2 - ay_2 = b(a^2 + b^2)x_0 - a(a^2 + b^2)y_0 \pmod{p}
\end{align*}
$$

This is a matrix recurrence. Each step applies the matrix $A$:

$$
\begin{bmatrix} x_k \\ y_k \end{bmatrix} = A^k \begin{bmatrix} x_0 \\ y_0 \end{bmatrix}, \qquad A = \begin{bmatrix} a & b \\ b & -a \end{bmatrix}
$$

### Even powers of A

Computing $A^2$:

$$
A^2 = \begin{bmatrix} a^2 + b^2 & 0 \\ 0 & a^2 + b^2 \end{bmatrix}
$$

$A^2$ is a scalar multiple of the identity. This means every even power is also diagonal:

$$
A^{2n} = \begin{bmatrix} (a^2+b^2)^n & 0 \\ 0 & (a^2+b^2)^n \end{bmatrix}
$$

Since $k = 929382$ is even, we get directly:

$$
\begin{cases}
x_k = (a^2+b^2)^{k/2}\, x_0 \pmod{p}\\
y_k = (a^2+b^2)^{k/2}\, y_0 \pmod{p}
\end{cases}
$$

### Recovering $a^2 + b^2$

Isolating $(a^2+b^2)$ from each equation:

$$
\begin{cases}
(a^2+b^2) = \left(x_k \cdot x_0^{-1}\right)^{(k/2)^{-1}} \pmod{p}\\
(a^2+b^2) = \left(y_k \cdot y_0^{-1}\right)^{(k/2)^{-1}} \pmod{p}
\end{cases}
$$

Both expressions must agree, which gives us a sanity check. Let $c = a^2 + b^2$.

### Solving the Diophantine equation

The remaining problem is finding all pairs $(a, b)$ with $a, b \in [2^{63}+1,\, 2^{64})$ such that $a^2 + b^2 = c$. This is a classical sum-of-two-squares Diophantine equation, solvable with sympy:

```python
from sympy.abc import a, b, d
from sympy.solvers.diophantine.diophantine import diop_quadratic

c = 388070793197506567215490364778692980485
solutions = diop_quadratic(a**2 + b**2 - c, d)  # yields 256 candidate pairs

sols = []
for sol in solutions:
    a, b = sol[0], sol[1]
    if a > 0 and b > 0:
        sols.append((a, b))
```

You can also verify with WolframAlpha or dcode.fr.

### Recovering the flag (odd k case)

The flag was signed with `b=1`, meaning $k$ is **odd**. We therefore need the odd-power formula. Computing a few more cases:

$$
A^3 = \begin{bmatrix} (a^2+b^2)\,a & (a^2+b^2)\,b \\ (a^2+b^2)\,b & -(a^2+b^2)\,a \end{bmatrix}
$$

$$
A^5 = \begin{bmatrix} (a^2+b^2)^2 a & (a^2+b^2)^2 b \\ (a^2+b^2)^2 b & -(a^2+b^2)^2 a \end{bmatrix}
$$

The general formula for odd $k$ is:

$$
A^k = \begin{bmatrix} (a^2+b^2)^{\lfloor k/2 \rfloor} a & (a^2+b^2)^{\lfloor k/2 \rfloor} b \\ (a^2+b^2)^{\lfloor k/2 \rfloor} b & -(a^2+b^2)^{\lfloor k/2 \rfloor} a \end{bmatrix}
$$

Setting $I = (a^2+b^2)^{\lfloor k/2 \rfloor}$, the system becomes:

$$
\begin{cases}
x_k = I\,a\,x_0 + I\,b\,y_0 \pmod{p}\\
y_k = I\,b\,x_0 - I\,a\,y_0 \pmod{p}
\end{cases}
$$

Solving for $x_0$ by eliminating $y_0$:

$$
x_0 = \frac{I\,b\,y_k + I\,a\,x_k}{(Ib)^2 + (Ia)^2} \pmod{p}
$$

We then brute-force over all $(a, b)$ pairs from the Diophantine step and over candidate values of $k$ (odd, in the expected range), checking for the flag prefix `404CTF{` in the recovered bytes.

### Solve script

```python
from Crypto.Util.number import *
from tqdm import tqdm

p = 179358513830906148619403250482250880334528756349120678091666297907253922185623290723862265402777434007178297319701286775733620488613530869850160450412929764046707392082705800333548316425165863556480623955587411083384086805686199851628022437853672200835000268893800610064747558825805271528526924659142504913631

x0 = 31327893549755863435091057018001364047001550123167466763978088560
y0 = 40086879903454460763941169874842683273969554387005198761777587497

s2 = (929382,
      118454610237220659897316062413105144789761952332893713333891996727204456010112572423850661749643268291339194773488138402728325770671625196790011560475297285424138262812704729573910897903628228179414627406601128765472041473647769084599481166191241495167773352105622894240398746332477947478817552973851804951566,
      65891615565820497528921288257089595342791556688007325193257144738940922602117787746412089423500836495505254334866586155889060897532850381510520943387446058037766901712521471259853536310481267471645770625452422081411718151580380288380630522313377397166067417623947500542258985636659962524606869196898543973764)

k, xk, yk = s2

# Recover a^2 + b^2
ab_square = ((xk * pow(x0, -1, p)) ** pow(k // 2, -1, p - 1)) % p

# Sanity check
assert xk == pow(ab_square, k // 2, p) * x0 % p
assert yk == pow(ab_square, k // 2, p) * y0 % p

xf, yf = (
    151683403543233106224623577311980037274441590153911847119566701699367001537936290730922138442040542620222943385810242081949211326676472369180020899628646165132503185978510932501521730827126356422842852151275382840062708701174847422687809816503983740455064453231285796998931373590630224653066573035583863902921,
    76688287388975729010764722746414768266232185597001389966088556498895611351239273625106383329192109917896575986761053032041287081527278426860237114874927478625771306887851752909713110684616229318569024945188998933167888234990912716799093707141023542980852524005127986940863843004517549295449194995101172400759
)

sols = [
    (19408166742585621858, 3375478764486599361), (11251784827398101583, 16169976233607779814),
    (12403098495162362094, 15304703228642093343), (15490481368009343322, 12170282666596612401),
    (19525291012677181263, 2614154560804364646),  (14808116019900613098, 12991939544912814609),
    (4464169836230621121,  19187026368637617438), (8361431878221344289,  17836963030274252658),
    (18458388333917213889, 6881765275844234142),  (19673288263522620246, 1016130945227873937),
    (17551820652760457103, 8944517033962093626),  (5090215494449507217,  19030514954082895914),
    (4801903485816257418,  19105300733315145681), (19030514954082895914, 5090215494449507217),
    (18432001254876301407, 6952130819953334094),  (6881765275844234142,  18458388333917213889),
    (16348309177954820559, 10991068201931272998), (19278421247870619546, 4051329088972801713),
    (16580445221025715647, 10637651501627230626), (13472728406892388146, 14372069526398119263),
    (9623850958962817041,  17188725546624363798), (9882634308252557514,  17041253836700398767),
    (15304703228642093343, 12403098495162362094), (19581292665253928298, 2154941009675038959),
    (9252711297286595553,  17391323320741627026), (18651028371445339782, 6341130331813687281),
    (700557878246186622,   19687051883325084801), (367459394861897202,   19696085062535506209),
    (17188725546624363798, 9623850958962817041),  (14597899006658654463, 13227703420809707454),
    (2318644855418193249,  19562583654311853522), (19105300733315145681, 4801903485816257418),
    (1016130945227873937,  19673288263522620246), (19340902140642958641, 3741697152841099098),
    (14372069526398119263, 13472728406892388146), (10991068201931272998, 16348309177954820559),
    (17836963030274252658, 8361431878221344289),  (12111618553410821487, 15536392413111266646),
    (4051329088972801713,  19278421247870619546), (15536392413111266646, 12111618553410821487),
    (6341130331813687281,  18651028371445339782), (19696085062535506209, 367459394861897202),
    (3375478764486599361,  19408166742585621858), (2154941009675038959,  19581292665253928298),
    (19187026368637617438, 4464169836230621121),  (18916879495873041582, 5497496096963113569),
    (17391323320741627026, 9252711297286595553),  (8944517033962093626,  17551820652760457103),
    (10637651501627230626, 16580445221025715647), (12991939544912814609, 14808116019900613098),
    (6952130819953334094,  18432001254876301407), (5497496096963113569,  18916879495873041582),
    (19687051883325084801, 700557878246186622),   (16263521288318153694, 11116144498068059457),
    (11116144498068059457, 16263521288318153694), (18028122996648466623, 7940879952198073566),
    (16169976233607779814, 11251784827398101583), (7940879952198073566,  18028122996648466623),
    (2614154560804364646,  19525291012677181263), (17041253836700398767, 9882634308252557514),
    (3741697152841099098,  19340902140642958641), (12170282666596612401, 15490481368009343322),
    (19562583654311853522, 2318644855418193249),  (13227703420809707454, 14597899006658654463),
]

# Brute-force k (odd values) and candidate (a, b) pairs
for a, b in sols:
    for k in tqdm(range(2**18 + 1, 1000000, 2), desc=f"BF k for ({a},{b})"):
        I = pow(a**2 + b**2, k // 2, p)
        x0_candidate = (I * b * yf + I * a * xf) * pow((I * b)**2 + (I * a)**2, -1, p) % p
        if b'404CTF{' in long_to_bytes(int(x0_candidate)):
            y0_candidate = (xf - I * a * x0_candidate) * pow(I * b, -1, p) % p
            print(long_to_bytes(int(x0_candidate)) + long_to_bytes(int(y0_candidate)))
            print(f"a={a}, b={b}, k={k}")
```

**Flag:** `404CTF{F4u7_p4S_80iR3_l4_t4ss3...}`
