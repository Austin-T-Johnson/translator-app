export default function(){
    let arr = ['My Penis is Hard', 'My Penis is REALLY HARD', 'My Hard Penis is Itchy', 'Itch My Penis', 'My Penis is Very Small and Itchy','VIZZZKAAKAA', 'dvvvvvvvvvvvvvt', 'Dex has the smallest penis in the entire world', 'Smell my penis'];
    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    return arr[randomIntFromInterval(0, arr.length-1)]
}