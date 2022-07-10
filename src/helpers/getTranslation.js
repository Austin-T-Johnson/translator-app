export default function(){
    let arr = ['Congrats on finding the easter egg!, O frabjous day!, Callooh!, Callay!' ];
    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    return arr[randomIntFromInterval(0, arr.length-1)]
}