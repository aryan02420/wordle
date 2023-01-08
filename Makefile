.PHONY: all

all:
	$(MAKE) index.html
	$(MAKE) images

index.html:	README.md Makefile
	pandoc README.md -s --embed-resources -o public/index.html

images: assets/sheet.png Makefile
	# normal
	convert assets/sheet.png -crop 8x8+0+0 -filter box -resize 400% public/images/a0.png
	convert assets/sheet.png -crop 8x8+8+0 -filter box -resize 400% public/images/b0.png
	convert assets/sheet.png -crop 8x8+16+0 -filter box -resize 400% public/images/c0.png
	convert assets/sheet.png -crop 8x8+24+0 -filter box -resize 400% public/images/d0.png
	convert assets/sheet.png -crop 8x8+32+0 -filter box -resize 400% public/images/e0.png
	convert assets/sheet.png -crop 8x8+0+8 -filter box -resize 400% public/images/f0.png
	convert assets/sheet.png -crop 8x8+8+8 -filter box -resize 400% public/images/g0.png
	convert assets/sheet.png -crop 8x8+16+8 -filter box -resize 400% public/images/h0.png
	convert assets/sheet.png -crop 8x8+24+8 -filter box -resize 400% public/images/i0.png
	convert assets/sheet.png -crop 8x8+32+8 -filter box -resize 400% public/images/j0.png
	convert assets/sheet.png -crop 8x8+0+16 -filter box -resize 400% public/images/k0.png
	convert assets/sheet.png -crop 8x8+8+16 -filter box -resize 400% public/images/l0.png
	convert assets/sheet.png -crop 8x8+16+16 -filter box -resize 400% public/images/m0.png
	convert assets/sheet.png -crop 8x8+24+16 -filter box -resize 400% public/images/n0.png
	convert assets/sheet.png -crop 8x8+32+16 -filter box -resize 400% public/images/o0.png
	convert assets/sheet.png -crop 8x8+0+24 -filter box -resize 400% public/images/p0.png
	convert assets/sheet.png -crop 8x8+8+24 -filter box -resize 400% public/images/q0.png
	convert assets/sheet.png -crop 8x8+16+24 -filter box -resize 400% public/images/r0.png
	convert assets/sheet.png -crop 8x8+24+24 -filter box -resize 400% public/images/s0.png
	convert assets/sheet.png -crop 8x8+32+24 -filter box -resize 400% public/images/t0.png
	convert assets/sheet.png -crop 8x8+0+32 -filter box -resize 400% public/images/u0.png
	convert assets/sheet.png -crop 8x8+8+32 -filter box -resize 400% public/images/v0.png
	convert assets/sheet.png -crop 8x8+16+32 -filter box -resize 400% public/images/w0.png
	convert assets/sheet.png -crop 8x8+24+32 -filter box -resize 400% public/images/x0.png
	convert assets/sheet.png -crop 8x8+32+32 -filter box -resize 400% public/images/y0.png
	convert assets/sheet.png -crop 8x8+0+40 -filter box -resize 400% public/images/z0.png
	# red
	convert assets/sheet.png -crop 8x8+40+0 -filter box -resize 400% public/images/a1.png
	convert assets/sheet.png -crop 8x8+48+0 -filter box -resize 400% public/images/b1.png
	convert assets/sheet.png -crop 8x8+56+0 -filter box -resize 400% public/images/c1.png
	convert assets/sheet.png -crop 8x8+64+0 -filter box -resize 400% public/images/d1.png
	convert assets/sheet.png -crop 8x8+72+0 -filter box -resize 400% public/images/e1.png
	convert assets/sheet.png -crop 8x8+40+8 -filter box -resize 400% public/images/f1.png
	convert assets/sheet.png -crop 8x8+48+8 -filter box -resize 400% public/images/g1.png
	convert assets/sheet.png -crop 8x8+56+8 -filter box -resize 400% public/images/h1.png
	convert assets/sheet.png -crop 8x8+64+8 -filter box -resize 400% public/images/i1.png
	convert assets/sheet.png -crop 8x8+72+8 -filter box -resize 400% public/images/j1.png
	convert assets/sheet.png -crop 8x8+40+16 -filter box -resize 400% public/images/k1.png
	convert assets/sheet.png -crop 8x8+48+16 -filter box -resize 400% public/images/l1.png
	convert assets/sheet.png -crop 8x8+56+16 -filter box -resize 400% public/images/m1.png
	convert assets/sheet.png -crop 8x8+64+16 -filter box -resize 400% public/images/n1.png
	convert assets/sheet.png -crop 8x8+72+16 -filter box -resize 400% public/images/o1.png
	convert assets/sheet.png -crop 8x8+40+24 -filter box -resize 400% public/images/p1.png
	convert assets/sheet.png -crop 8x8+48+24 -filter box -resize 400% public/images/q1.png
	convert assets/sheet.png -crop 8x8+56+24 -filter box -resize 400% public/images/r1.png
	convert assets/sheet.png -crop 8x8+64+24 -filter box -resize 400% public/images/s1.png
	convert assets/sheet.png -crop 8x8+72+24 -filter box -resize 400% public/images/t1.png
	convert assets/sheet.png -crop 8x8+40+32 -filter box -resize 400% public/images/u1.png
	convert assets/sheet.png -crop 8x8+48+32 -filter box -resize 400% public/images/v1.png
	convert assets/sheet.png -crop 8x8+56+32 -filter box -resize 400% public/images/w1.png
	convert assets/sheet.png -crop 8x8+64+32 -filter box -resize 400% public/images/x1.png
	convert assets/sheet.png -crop 8x8+72+32 -filter box -resize 400% public/images/y1.png
	convert assets/sheet.png -crop 8x8+40+40 -filter box -resize 400% public/images/z1.png
	# yellow
	convert assets/sheet.png -crop 8x8+80+0 -filter box -resize 400% public/images/a2.png
	convert assets/sheet.png -crop 8x8+88+0 -filter box -resize 400% public/images/b2.png
	convert assets/sheet.png -crop 8x8+96+0 -filter box -resize 400% public/images/c2.png
	convert assets/sheet.png -crop 8x8+104+0 -filter box -resize 400% public/images/d2.png
	convert assets/sheet.png -crop 8x8+112+0 -filter box -resize 400% public/images/e2.png
	convert assets/sheet.png -crop 8x8+80+8 -filter box -resize 400% public/images/f2.png
	convert assets/sheet.png -crop 8x8+88+8 -filter box -resize 400% public/images/g2.png
	convert assets/sheet.png -crop 8x8+96+8 -filter box -resize 400% public/images/h2.png
	convert assets/sheet.png -crop 8x8+104+8 -filter box -resize 400% public/images/i2.png
	convert assets/sheet.png -crop 8x8+112+8 -filter box -resize 400% public/images/j2.png
	convert assets/sheet.png -crop 8x8+80+16 -filter box -resize 400% public/images/k2.png
	convert assets/sheet.png -crop 8x8+88+16 -filter box -resize 400% public/images/l2.png
	convert assets/sheet.png -crop 8x8+96+16 -filter box -resize 400% public/images/m2.png
	convert assets/sheet.png -crop 8x8+104+16 -filter box -resize 400% public/images/n2.png
	convert assets/sheet.png -crop 8x8+112+16 -filter box -resize 400% public/images/o2.png
	convert assets/sheet.png -crop 8x8+80+24 -filter box -resize 400% public/images/p2.png
	convert assets/sheet.png -crop 8x8+88+24 -filter box -resize 400% public/images/q2.png
	convert assets/sheet.png -crop 8x8+96+24 -filter box -resize 400% public/images/r2.png
	convert assets/sheet.png -crop 8x8+104+24 -filter box -resize 400% public/images/s2.png
	convert assets/sheet.png -crop 8x8+112+24 -filter box -resize 400% public/images/t2.png
	convert assets/sheet.png -crop 8x8+80+32 -filter box -resize 400% public/images/u2.png
	convert assets/sheet.png -crop 8x8+88+32 -filter box -resize 400% public/images/v2.png
	convert assets/sheet.png -crop 8x8+96+32 -filter box -resize 400% public/images/w2.png
	convert assets/sheet.png -crop 8x8+104+32 -filter box -resize 400% public/images/x2.png
	convert assets/sheet.png -crop 8x8+112+32 -filter box -resize 400% public/images/y2.png
	convert assets/sheet.png -crop 8x8+80+40 -filter box -resize 400% public/images/z2.png
	# green
	convert assets/sheet.png -crop 8x8+120+0 -filter box -resize 400% public/images/a3.png
	convert assets/sheet.png -crop 8x8+128+0 -filter box -resize 400% public/images/b3.png
	convert assets/sheet.png -crop 8x8+136+0 -filter box -resize 400% public/images/c3.png
	convert assets/sheet.png -crop 8x8+144+0 -filter box -resize 400% public/images/d3.png
	convert assets/sheet.png -crop 8x8+152+0 -filter box -resize 400% public/images/e3.png
	convert assets/sheet.png -crop 8x8+120+8 -filter box -resize 400% public/images/f3.png
	convert assets/sheet.png -crop 8x8+128+8 -filter box -resize 400% public/images/g3.png
	convert assets/sheet.png -crop 8x8+136+8 -filter box -resize 400% public/images/h3.png
	convert assets/sheet.png -crop 8x8+144+8 -filter box -resize 400% public/images/i3.png
	convert assets/sheet.png -crop 8x8+152+8 -filter box -resize 400% public/images/j3.png
	convert assets/sheet.png -crop 8x8+120+16 -filter box -resize 400% public/images/k3.png
	convert assets/sheet.png -crop 8x8+128+16 -filter box -resize 400% public/images/l3.png
	convert assets/sheet.png -crop 8x8+136+16 -filter box -resize 400% public/images/m3.png
	convert assets/sheet.png -crop 8x8+144+16 -filter box -resize 400% public/images/n3.png
	convert assets/sheet.png -crop 8x8+152+16 -filter box -resize 400% public/images/o3.png
	convert assets/sheet.png -crop 8x8+120+24 -filter box -resize 400% public/images/p3.png
	convert assets/sheet.png -crop 8x8+128+24 -filter box -resize 400% public/images/q3.png
	convert assets/sheet.png -crop 8x8+136+24 -filter box -resize 400% public/images/r3.png
	convert assets/sheet.png -crop 8x8+144+24 -filter box -resize 400% public/images/s3.png
	convert assets/sheet.png -crop 8x8+152+24 -filter box -resize 400% public/images/t3.png
	convert assets/sheet.png -crop 8x8+120+32 -filter box -resize 400% public/images/u3.png
	convert assets/sheet.png -crop 8x8+128+32 -filter box -resize 400% public/images/v3.png
	convert assets/sheet.png -crop 8x8+136+32 -filter box -resize 400% public/images/w3.png
	convert assets/sheet.png -crop 8x8+144+32 -filter box -resize 400% public/images/x3.png
	convert assets/sheet.png -crop 8x8+152+32 -filter box -resize 400% public/images/y3.png
	convert assets/sheet.png -crop 8x8+120+40 -filter box -resize 400% public/images/z3.png
	# controls
	convert assets/sheet.png -crop 8x8+8+40 -filter box -resize 400% public/images/blank.png
	convert assets/sheet.png -crop 8x8+16+40 -filter box -resize 400% public/images/cursor.png
	convert assets/sheet.png -crop 12x8+0+48 -filter box -resize 400% public/images/bksp.png
	convert assets/sheet.png -crop 12x8+12+48 -filter box -resize 400% public/images/enter.png