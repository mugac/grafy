<main>
    <div class="container">
        <div class="text">
        <p>DFS (Depth-First Search, česky prohledávání do hloubky) je jedna z nejběžnějších technik pro procházení grafů nebo stromů. <br><br>
        Algoritmus prochází graf od vrcholu, kde začíná, a pokračuje hlouběji a hlouběji, dokud nenarazí na konec 
        grafu, nebo nedosáhne nějakého limitu. V tomto okamžiku se vrací zpět a začne procházet jinou cestou.
            <br><br>
        DFS může být implementován pomocí rekurze nebo pomocí iterace s pomocí zásobníku (stacku). V případě 
        rekurze se algoritmus volá sám sebe pro každý sousední vrchol, který ještě nebyl navštíven. V případě 
        iterace se používá zásobník, který slouží jako náhrada za rekurzivní volání.
        <br><br>
        DFS je velmi rychlý a efektivní, ale má jednu nevýhodu: může snadno "zabloudit" v grafu a procházet se dokola,
         pokud graf obsahuje cykly. Je tedy vhodné použít DFS spíše v případech, kdy máte zájem o procházení celého grafu 
        nebo stromu, a nejen o nalezení nejkratší cesty mezi dvěma vrcholy.</p>
        <br>
        Využití DFS:
        <ul>
            <li>Prohledávání internetových stránek pro indexování vyhledávačů</li>
            <li>Prohledávání stromu souborů v počítači</li>
            <li>Prohledávání molekul pro hledání konformací</li>
            <li>Procházení topologie</li>
        </ul>
    
    </div>
    <div class="gif">
        <img src="animace/dfs.gif" alt="gif">
    </div>
    <div class="code">
        <table>
        <tbody>
            <tr><code class="keyword">using </code><code class="color1">System</code><code class="plain">;</code></tr>
            <tr><code class="keyword">using </code><code class="color1">System.Collections.Generic</code><code class="plain">;</code></tr>
            <tr></tr>
            <tr><code class="keyword">public class </code><code class="color1">Program</code></tr>
            <tr><code class="plain">&#123;</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="keyword">public static void </code><code class="color1">Main</code><code class="plain">()</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">&#123;</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="color1">Queue</code><code class="plain">&#60;int&#62;&nbsp</code> <code class="color1">que </code><code class="plain">= </code><code class="keyword">new </code><code class="color1">Queue</code><code class="plain">&#60;int&#62;</code><code class="plain">();</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="color1">Graph </code><code class="plain">g = </code><code class="keyword">new </code><code class="color1">Graph</code><code class="plain">(</code><code class="number">4</code><code class="plain">);</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">g.</code><code class="keyword">addEdge</code><code class="plain">(</code><code class="number">0</code><code class="plain">, </code><code class="number">1</code><code class="plain">);</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">g.</code><code class="keyword">addEdge</code><code class="plain">(</code><code class="number">0</code><code class="plain">, </code><code class="number">2</code><code class="plain">);</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">g.</code><code class="keyword">addEdge</code><code class="plain">(</code><code class="number">1</code><code class="plain">, </code><code class="number">2</code><code class="plain">);</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">g.</code><code class="keyword">addEdge</code><code class="plain">(</code><code class="number">2</code><code class="plain">, </code><code class="number">0</code><code class="plain">);</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">g.</code><code class="keyword">addEdge</code><code class="plain">(</code><code class="number">2</code><code class="plain">, </code><code class="number">3</code><code class="plain">);</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">g.</code><code class="keyword">addEdge</code><code class="plain">(</code><code class="number">3</code><code class="plain">, </code><code class="number">3</code><code class="plain">);</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">g.</code><code class="keyword">DFS</code><code class="plain">(</code><code class="number">2</code><code class="plain">);</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">&#125;</code></tr>
            <tr><code class="plain">&#125;</code></tr>
            <tr></tr>
            <tr><code class="keyword">public class </code><code class="color1">Graph</code></tr>
            <tr><code class="plain">&#123;</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="keyword">int </code><code class="color1">V</code><code class="plain">;</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="color1">List</code><code class="plain">&#60;int&#62;&#91;&#93;&nbsp;</code><code class="color1">adj</code><code class="plain">;</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="keyword">public </code><code class="color1">Graph</code><code class="plain">(</code><code class="plain">int v</code><code class="plain">)</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">&#123;</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">V </code><code class="keyword">= </code><code class="plain">v;</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">adj </code><code class="keyword">= new </code><code class="color1">List</code><code class="plain">&#60;int&#62;&#91;v&#93;&nbsp;</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="keyword">for </code><code class="plain">(int i = 0; i&#60; v; i++)</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">&#123;</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">adj&#91;i&#93;&nbsp;</code><code class="keyword">= new </code><code class="color1">List</code><code class="plain">&#60;int&#62;();</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">&#125;</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">&#125;</code></tr>
            <tr></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="keyword">public void </code><code class="color1">addEdge</code><code class="plain">(int v, int w)</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">&#123;</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">adj&#91;v&#93;.</code><code class="color1">Add</code><code class="plain">(w);</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">&#125;</code></tr>
            <tr></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="keyword">public void </code><code class="color1">DFS</code><code class="plain">(int s)</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">&#123</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="keyword">bool</code><code class="plain">&#91;&#93;&nbsp;</code><code class="color1">visited </code><code class="keyword">= new bool</code><code class="plain">&#91;V&#93;;</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="keyword">for </code><code class="plain">(int i = 0; i&#60; v; i++)</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">&#123;</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">visited&#91;i&#93;&nbsp;</code><code class="keyword">= </code><code class="number">false</code><code class="plain">;</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">&#125</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="color1">Queue</code><code class="plain">&#60;int&#62;&nbsp;</code><code class="plain">queue </code><code class="keyword">= new </code><code class="color1">Queue</code><code class="plain">&#60;int&#62;();</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">queue.</code><code class="color1">Enqueue</code><code class="plain">(s);</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">visited&#60;s&#62;&nbsp;</code><code class="keyword">= </code><code class="number">true</code><code class="plain">;</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="keyword">while </code><code class="plain">(queue.Count != 0)</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">&#125;</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="keyword">int </code><code class="color1">pop </code><code class="keyword">= </code><code class="plain">queue.</code><code class="color1">Dequeue</code><code class="plain">();</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">Console.</code><code class="color1">Write</code><code class="plain">(pop + &#34;&nbsp;&#34;);</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="keyword">foreach </code><code class="plain">(var vert in adj&#91;pop&#93;)</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">&#123;</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="keyword">if </code><code class="plain">(!visited&#91;vert&#93;)</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">&#123;</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">visited&#91;vert&#93;&nbsp;</code><code class="keyword">= </code><code class="number">true</code><code class="plain">;</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">queue.</code><code class="color1">Enqueue</code><code class="plain">(vert);</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">&#125;</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">&#125;</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">&#125;</code></tr>
            <tr><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">&#125;</code></tr>
            <tr><code class="plain">&#125;</code></tr>
        </tbody>
        </table>
    </div>
    </div>
    </main>
<style>
    div{
        /* border: 1px solid #8D8272; */
        margin-top: 5%;
        margin-left: 5%;
        padding: 1%;
    }
    p{
        text-align: left;
        line-break: normal;
        color: white;
    }
    img{
        max-width:40vw;
    }
    .text{
        text-align: left;
        line-break: normal;
        color: white;
    }
    .gif{
        max-width: min-content;
    }
    .container {  display: grid;
        display: grid; 
  grid-template-columns: 1fr 1fr; 
  grid-template-rows: 1fr 3fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    "text gif"
    "code code"; 
}
.code {
    border-radius: 2%;
    background-color: #464545;
    text-align: left;
  }
.keyword{
    color: #ff1818;
}
.number{
    color: rgb(0, 255, 255);
}
.plain{
    color: aliceblue;
}
.color1{
    color: #ffc400;
}
</style>