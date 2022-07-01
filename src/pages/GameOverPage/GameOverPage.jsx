import React from 'react'
import "./GameOverPage.scss"
const GameOverPage=()=> {
  return (
    <div className='page_gameover page'>
        <div className="page__title">камни бесконечности</div>
			<div className="page_content">
				<div className="page_gameover__title">
					игра завершена
				</div>
			</div>

			<div className="page_empty"></div>
    </div>
  )
}

export default GameOverPage