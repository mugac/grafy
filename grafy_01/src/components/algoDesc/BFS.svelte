<main>
    <div class="container">
        <div class="text">
            BFS (breadth-first search) je algoritmus pro prohledávání grafů. Jeho základní myšlenkou je prohledávat graf postupně od startovního uzlu do sousedních uzlů,
            poté do sousedních uzlů těchto uzlů a tak dále, dokud nenavštíví všechny dosažitelné uzly.
            <br><br>
            Kroky algoritmu: 
            <br>
            <ul>
                <li>Zvolte počáteční uzel a vložte ho do fronty.</li>
                <li>Odeberte uzel z fronty a prohlédněte si jeho sousedy.</li>
                <li>Pokud sousední uzel ještě nebyl navštíven, vložte ho do fronty a označte jako navštívený.</li>
                <li> Opakujte krok 2 a 3 pro všechny sousedy aktuálního uzlu.</li>
                <li>Pokud byly navštíveny všechny dosažitelné uzly, algoritmus končí.</li>
                <li>Pokud ne, opakujte kroky 2 až 5 pro další uzel v frontě.</li>
            </ul>
            
            Algoritmus pokračuje v prohledávání grafu, dokud nenavštíví všechny dosažitelné uzly. Po dokončení algoritmu se pro každý uzel v grafu určí, zda byl navštíven nebo ne. 
            <br><br>
            Tento algoritmus je často používán k nalezení nejkratší cesty mezi dvěma uzly v grafu, pokud existuje.
            <br><br>
            BFS algoritmus lze implementovat pomocí datové struktury fronty (FIFO), do které se ukládají uzly, které čekají na prozkoumání jejich sousedů. Každý uzel by měl být označen jako navštívený v okamžiku, kdy je odebrán z fronty. To zajišťuje, že každý uzel bude prozkoumán pouze jednou a že algoritmus navštíví všechny dosažitelné uzly.
    </div>
    <div class="gif">
        <img src="animace/bfs.png" alt="gif">
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