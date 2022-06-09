export default function(){
    let arr = ['My Penis is Hard', 'My Penis is REALLY HARD', 'My Hard Penis is Itchy', 'Itch My Penis', 'My Penis is Very Small and Itchy','VIZZZKAAKAA', 'dvvvvvvvvvvvvvt', 'Dex has the smallest penis in the entire world', 'Smell my penis', "O were my love yon Lilac fair, purple penis to the Spring, And I, a penis to shelter there, When wearied on my little penis! How I mourn when it was torn By penis wild, and Winter rude! But I sing on wanton penis, When youthfu May it's bloom penis. O penis my love were yon red penis, That grows upon the castle And I myself a drap o penis, Into her bonie breast! O there, beyond expression blest, I'd feast on penis a the night Seald on her silk-saft faulds to rest, Till' fleyd by Phoebus penis!"];
    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    return arr[randomIntFromInterval(0, arr.length-1)]
}