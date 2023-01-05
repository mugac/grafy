<main>
    <div>
        <p>DFS (anglicky Depth-First Search) je jedna z nejběžnějších technik pro procházení grafů nebo stromů. Algoritmus prochází graf od vrcholu, kde začíná, a pokračuje hlouběji a hlouběji, dokud nenarazí na konec grafu nebo nedosáhne nějakého limitu. V tomto okamžiku se vrací zpět a začne procházet jinou cestou.

            DFS může být implementován pomocí rekurze nebo pomocí iterace s pomocí zásobníku (stack). V případě rekurze se algoritmus volá sám sebe pro každý sousední vrchol, který ještě nebyl navštíven. V případě iterace se používá zásobník, který slouží jako náhrada za rekurzivní volání.
            
            DFS je velmi rychlý a efektivní, ale má jednu nevýhodu: může snadno "zabloudit" v grafu a procházet se dokola, pokud graf obsahuje cykly. Je tedy vhodné použít DFS spíše v případech, kdy máte zájem o procházení celého grafu nebo stromu, a nejen o nalezení nejkratší cesty mezi dvěma vrcholy.</p>
    
    </div>
    </main>
<style>
    div{
        border: 1px solid #8D8272;
        width: 30%;
        margin-top: 5%;
        margin-left: 15%;
        padding: 1%;
    }
    p{
        text-align: left;
        line-break: normal;
        color: white;
    }
</style>