
let loadingHtml =
    `
    <div class="face-effet-socket">
    <div class="face-effet-gel face-effet-center-gel">
        <div class=" face-effet-hex-brick face-effet-h1"></div>
        <div class=" face-effet-hex-brick face-effet-h2"></div>
        <div class=" face-effet-hex-brick face-effet-h3"></div>
    </div>
    <div class="face-effet-gel face-effet-c1 face-effet-r1">
        <div class=" face-effet-hex-brick face-effet-h1"></div>
        <div class=" face-effet-hex-brick face-effet-h2"></div>
        <div class=" face-effet-hex-brick face-effet-h3"></div>
    </div>
    <div class="face-effet-gel face-effet-c2 face-effet-r1">
        <div class=" face-effet-hex-brick face-effet-h1"></div>
        <div class=" face-effet-hex-brick face-effet-h2"></div>
        <div class=" face-effet-hex-brick face-effet-h3"></div>
    </div>
    <div class="face-effet-gel face-effet-c3 face-effet-r1">
        <div class=" face-effet-hex-brick face-effet-h1"></div>
        <div class=" face-effet-hex-brick face-effet-h2"></div>
        <div class=" face-effet-hex-brick face-effet-h3"></div>
    </div>
    <div class="face-effet-gel face-effet-c4 face-effet-r1">
        <div class=" face-effet-hex-brick face-effet-h1"></div>
        <div class=" face-effet-hex-brick face-effet-h2"></div>
        <div class=" face-effet-hex-brick face-effet-h3"></div>
    </div>
    <div class="face-effet-gel face-effet-c5 face-effet-r1">
        <div class=" face-effet-hex-brick face-effet-h1"></div>
        <div class=" face-effet-hex-brick face-effet-h2"></div>
        <div class=" face-effet-hex-brick face-effet-h3"></div>
    </div>
    <div class="face-effet-gel face-effet-c6 face-effet-r1">
        <div class=" face-effet-hex-brick face-effet-h1"></div>
        <div class=" face-effet-hex-brick face-effet-h2"></div>
        <div class=" face-effet-hex-brick face-effet-h3"></div>
    </div>

    <div class="face-effet-gel face-effet-c7 face-effet-r2">
        <div class=" face-effet-hex-brick face-effet-h1"></div>
        <div class=" face-effet-hex-brick face-effet-h2"></div>
        <div class=" face-effet-hex-brick face-effet-h3"></div>
    </div>

    <div class="face-effet-gel face-effet-c8 face-effet-r2">
        <div class=" face-effet-hex-brick face-effet-h1"></div>
        <div class=" face-effet-hex-brick face-effet-h2"></div>
        <div class=" face-effet-hex-brick face-effet-h3"></div>
    </div>
    <div class="face-effet-gel face-effet-c9 face-effet-r2">
        <div class=" face-effet-hex-brick face-effet-h1"></div>
        <div class=" face-effet-hex-brick face-effet-h2"></div>
        <div class=" face-effet-hex-brick face-effet-h3"></div>
    </div>
    <div class="face-effet-gel face-effet-c10 face-effet-r2">
        <div class=" face-effet-hex-brick face-effet-h1"></div>
        <div class=" face-effet-hex-brick face-effet-h2"></div>
        <div class=" face-effet-hex-brick face-effet-h3"></div>
    </div>
    <div class="face-effet-gel face-effet-c11 face-effet-r2">
        <div class=" face-effet-hex-brick face-effet-h1"></div>
        <div class=" face-effet-hex-brick face-effet-h2"></div>
        <div class=" face-effet-hex-brick face-effet-h3"></div>
    </div>
    <div class="face-effet-gel face-effet-c12 face-effet-r2">
        <div class=" face-effet-hex-brick face-effet-h1"></div>
        <div class=" face-effet-hex-brick face-effet-h2"></div>
        <div class=" face-effet-hex-brick face-effet-h3"></div>
    </div>
    <div class="face-effet-gel face-effet-c13 face-effet-r2">
        <div class=" face-effet-hex-brick face-effet-h1"></div>
        <div class=" face-effet-hex-brick face-effet-h2"></div>
        <div class=" face-effet-hex-brick face-effet-h3"></div>
    </div>
    <div class="face-effet-gel face-effet-c14 face-effet-r2">
        <div class=" face-effet-hex-brick face-effet-h1"></div>
        <div class=" face-effet-hex-brick face-effet-h2"></div>
        <div class=" face-effet-hex-brick face-effet-h3"></div>
    </div>
    <div class="face-effet-gel face-effet-c15 face-effet-r2">
        <div class=" face-effet-hex-brick face-effet-h1"></div>
        <div class=" face-effet-hex-brick face-effet-h2"></div>
        <div class=" face-effet-hex-brick face-effet-h3"></div>
    </div>
    <div class="face-effet-gel face-effet-c16 face-effet-r2">
        <div class=" face-effet-hex-brick face-effet-h1"></div>
        <div class=" face-effet-hex-brick face-effet-h2"></div>
        <div class=" face-effet-hex-brick face-effet-h3"></div>
    </div>
    <div class="face-effet-gel face-effet-c17 face-effet-r2">
        <div class=" face-effet-hex-brick face-effet-h1"></div>
        <div class=" face-effet-hex-brick face-effet-h2"></div>
        <div class=" face-effet-hex-brick face-effet-h3"></div>
    </div>
    <div class="face-effet-gel face-effet-c18 face-effet-r2">
        <div class=" face-effet-hex-brick face-effet-h1"></div>
        <div class=" face-effet-hex-brick face-effet-h2"></div>
        <div class=" face-effet-hex-brick face-effet-h3"></div>
    </div>
    <div class="face-effet-gel face-effet-c19 face-effet-r3">
        <div class=" face-effet-hex-brick face-effet-h1"></div>
        <div class=" face-effet-hex-brick face-effet-h2"></div>
        <div class=" face-effet-hex-brick face-effet-h3"></div>
    </div>
    <div class="face-effet-gel face-effet-c20 face-effet-r3">
        <div class=" face-effet-hex-brick face-effet-h1"></div>
        <div class=" face-effet-hex-brick face-effet-h2"></div>
        <div class=" face-effet-hex-brick face-effet-h3"></div>
    </div>
    <div class="face-effet-gel face-effet-c21 face-effet-r3">
        <div class=" face-effet-hex-brick face-effet-h1"></div>
        <div class=" face-effet-hex-brick face-effet-h2"></div>
        <div class=" face-effet-hex-brick face-effet-h3"></div>
    </div>
    <div class="face-effet-gel face-effet-c22 face-effet-r3">
        <div class=" face-effet-hex-brick face-effet-h1"></div>
        <div class=" face-effet-hex-brick face-effet-h2"></div>
        <div class=" face-effet-hex-brick face-effet-h3"></div>
    </div>
    <div class="face-effet-gel face-effet-c23 face-effet-r3">
        <div class=" face-effet-hex-brick face-effet-h1"></div>
        <div class=" face-effet-hex-brick face-effet-h2"></div>
        <div class=" face-effet-hex-brick face-effet-h3"></div>
    </div>
    <div class="face-effet-gel face-effet-c24 face-effet-r3">
        <div class=" face-effet-hex-brick face-effet-h1"></div>
        <div class=" face-effet-hex-brick face-effet-h2"></div>
        <div class=" face-effet-hex-brick face-effet-h3"></div>
    </div>
    <div class="face-effet-gel face-effet-c25 face-effet-r3">
        <div class=" face-effet-hex-brick face-effet-h1"></div>
        <div class=" face-effet-hex-brick face-effet-h2"></div>
        <div class=" face-effet-hex-brick face-effet-h3"></div>
    </div>
    <div class="face-effet-gel face-effet-c26 face-effet-r3">
        <div class=" face-effet-hex-brick face-effet-h1"></div>
        <div class=" face-effet-hex-brick face-effet-h2"></div>
        <div class=" face-effet-hex-brick face-effet-h3"></div>
    </div>
    <div class="face-effet-gel face-effet-c28 face-effet-r3">
        <div class=" face-effet-hex-brick face-effet-h1"></div>
        <div class=" face-effet-hex-brick face-effet-h2"></div>
        <div class=" face-effet-hex-brick face-effet-h3"></div>
    </div>
    <div class="face-effet-gel face-effet-c29 face-effet-r3">
        <div class=" face-effet-hex-brick face-effet-h1"></div>
        <div class=" face-effet-hex-brick face-effet-h2"></div>
        <div class=" face-effet-hex-brick face-effet-h3"></div>
    </div>
    <div class="face-effet-gel face-effet-c30 face-effet-r3">
        <div class=" face-effet-hex-brick face-effet-h1"></div>
        <div class=" face-effet-hex-brick face-effet-h2"></div>
        <div class=" face-effet-hex-brick face-effet-h3"></div>
    </div>
    <div class="face-effet-gel face-effet-c31 face-effet-r3">
        <div class=" face-effet-hex-brick face-effet-h1"></div>
        <div class=" face-effet-hex-brick face-effet-h2"></div>
        <div class=" face-effet-hex-brick face-effet-h3"></div>
    </div>
    <div class="face-effet-gel face-effet-c32 face-effet-r3">
        <div class=" face-effet-hex-brick face-effet-h1"></div>
        <div class=" face-effet-hex-brick face-effet-h2"></div>
        <div class=" face-effet-hex-brick face-effet-h3"></div>
    </div>
    <div class="face-effet-gel face-effet-c33 face-effet-r3">
        <div class=" face-effet-hex-brick face-effet-h1"></div>
        <div class=" face-effet-hex-brick face-effet-h2"></div>
        <div class=" face-effet-hex-brick face-effet-h3"></div>
    </div>
    <div class="face-effet-gel face-effet-c34 face-effet-r3">
        <div class=" face-effet-hex-brick face-effet-h1"></div>
        <div class=" face-effet-hex-brick face-effet-h2"></div>
        <div class=" face-effet-hex-brick face-effet-h3"></div>
    </div>
    <div class="face-effet-gel face-effet-c35 face-effet-r3">
        <div class=" face-effet-hex-brick face-effet-h1"></div>
        <div class=" face-effet-hex-brick face-effet-h2"></div>
        <div class=" face-effet-hex-brick face-effet-h3"></div>
    </div>
    <div class="face-effet-gel face-effet-c36 face-effet-r3">
        <div class=" face-effet-hex-brick face-effet-h1"></div>
        <div class=" face-effet-hex-brick face-effet-h2"></div>
        <div class=" face-effet-hex-brick face-effet-h3"></div>
    </div>
    <div class="face-effet-gel face-effet-c37 face-effet-r3">
        <div class=" face-effet-hex-brick face-effet-h1"></div>
        <div class=" face-effet-hex-brick face-effet-h2"></div>
        <div class=" face-effet-hex-brick face-effet-h3"></div>
    </div>

</div>
    `

export {
    loadingHtml
}
