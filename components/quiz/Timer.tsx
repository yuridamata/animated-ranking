import React, { useState, useEffect } from 'react';


const QTD_MINUTOS = 10;
function Timer() {
 
 const [tempoRestante, setTempoRestante] = useState(5)

 useEffect(() => {
   const timer = setInterval(() => {
		setTempoRestante(prevTempoRestante => {
			const novoTempo  = prevTempoRestante - 1;
			if(novoTempo < 0 ){
				return prevTempoRestante;
			}

			return novoTempo;
		});
   }, 1000);

   return () => clearInterval(timer);
 }, []);

 const minutes = Math.floor(tempoRestante / 60);
 const seconds = tempoRestante % 60;

 return (
   <div>
     {minutes}:{seconds < 10 ? '0' : ''}{seconds}
   </div>
 );
}

export default Timer;

