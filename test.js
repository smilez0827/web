
function solve(n) {
    let a = new Array();;
    let i = 0;
    let j = 0;
    for (i = 0; i < n; i++) {
        a[i] = new Array();
        for (j = 0; j < n; j++) {
            a[i][j] = 0;
        }
    }
    for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
            if ((i >= n / 2) && (j < n / 2)) {
                if (n - i - 1 > j) {
                    a[i][j] = 4
                } else {
                    a[i][j] = 5
                }
                if (n - i - 1 == j) {
                    a[i][j] = 0
                }
            }

            if (i < n / 2 && j < n / 2) {
                if (i > j) {
                    a[i][j] = 3
                } else {
                    a[i][j] = 2
                }
                if (i == j) {
                    a[i][j] = 0
                }
            }

            if (i >= n / 2 && j >= n / 2) {
                if (i > j) {
                    a[i][j] = 6
                } else {
                    a[i][j] = 7
                }
                if (i == j) {
                    a[i][j] = 0
                }
            }

            if (i < n / 2 && j >= n / 2) {
                if (i > n - j - 1) {
                    a[i][j] = 8
                } else {
                    a[i][j] = 1
                }
                if (i == n - j - 1) {
                    a[i][j] = 0
                }
            }
        }
    }
    if (n % 2 == 1) {
        for (i = 0; i < n; i++) {
            a[parseInt(n / 2)][i] = 0;
            a[i][parseInt(n / 2)] = 0
        }
    }
    for (i = 0; i < n; i++) {
        console.log(a[i].join(" "))
    }
}

let a = {
    z: "23"
}
let b = {
    x: "22"
}
b.prototype = a;

console.log(Object.keys(b))