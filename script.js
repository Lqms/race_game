//ставка
function make_bet(){
    let bet = document.querySelector(".bet");
    let bet_car1=document.querySelector(".bet_car1");
    let bet_car2=document.querySelector(".bet_car2");

    if ( bet.value=="" || bet.value<=0 || bet.value>balance || !(bet_car1.checked || bet_car2.checked) ) {
        alert("НЕКОРРЕКТНЫЙ ВВОД СТАВКИ!");
        return 0
    }else{
        bet.disabled=true;
        bet_car1.disabled=true;
        bet_car2.disabled=true;

        if (bet_car1.checked==true) return 1
        else return 2   
    }
}
//ставка


//старт
function start(){
    if (make_bet()==0){
        return
    }
    let bet = document.querySelector(".bet");
    let balance_p=document.querySelector(".balance");
    winner=false;

    restart (car1);
    restart (car2);

    let button_start = document.querySelector("button");
    button_start.disabled=true;
    button_start.classList.toggle("enable");
    timer_start();
}
//старт

//таймер
function timer_start(){
    let timer=3;
    let start_p=document.querySelector(".start_p");
    let interval = setInterval(() => {
        start_p.innerHTML=timer;
        //console.log(timer);
        if (timer==0){
            start_p.innerHTML="RACE!";
            clearInterval(interval);
            setTimeout(() => {
                start_p.innerHTML="";
                race();
            }, 500);
        }else{
            timer-=1;
        } 
    }, 500);
}
//таймер

//рестарт
function restart(car){
    document.querySelector(car.name).style.marginLeft = 0;
    car.speed=0;
    document.querySelector(car.w_name).innerHTML="";
}
//рестарт

//запуск гонки
function race(){
    axelerate(car1);
    axelerate(car2);
}
//запуск гонки

//ускорение машин
function axelerate(car){
    let interval=setInterval(() => {
        document.querySelector(car.name).style.marginLeft = `${car.speed}%`
        car.axelerated();
        //console.log(car.speed)
        if (car.speed>=100) {
            if (!winner) {
                winner_is(car);
            }
            clearInterval(interval);
        }
    }, 20);
}
//ускорение машин

//победа
function winner_is(car){
    winner=true;
    document.querySelector(car.w_name).innerHTML="WINNER!";

    let balance_p=document.querySelector(".balance");
    let bet = document.querySelector(".bet");
    let bet_car1=document.querySelector(".bet_car1");
    let bet_car2=document.querySelector(".bet_car2");
    let button_start=document.querySelector("button");

    //изменение баланса
    if (car.number==make_bet()){
        balance+=Number(bet.value);
        balance_p.innerHTML=`Баланс: ${balance}`;
    }else{
        balance-=bet.value;
        balance_p.innerHTML=`Баланс: ${balance}`;
    }
    //изменение баланса

    setTimeout(() => {
        button_start.disabled=false;
        button_start.classList.toggle("enable");
    }, 500);

    bet.disabled=false;
    bet_car1.disabled=false;
    bet_car2.disabled=false;

}
//победа


//рандом
function getRand(min, max){
    return Math.floor(Math.random( ) * (max - min + 1)) + min
}
//рандом

//класс машин
class Car{
    constructor(name, speed, w_name, number){
        this.name=name;
        this.speed=speed;
        this.w_name=w_name;
        this.number=number;
    }
    axelerated(){
        this.speed+=getRand(0.1+this.speed/50,0.2+this.speed/50);
        console.log(this.speed)
    }
}
//класс машин

//переменные
let car1 = new Car(".racer_1", 1, ".winner_1", 1);
let car2 = new Car(".racer_2", 100, ".winner_2", 2);
let winner=false;
let balance=100;
//переменные


document.querySelector(".bet").onchange=function(){
    let bet = document.querySelector(".bet");
    if (bet.value>balance) bet.value=balance;
    if (bet.value<0) bet.value=0;
}