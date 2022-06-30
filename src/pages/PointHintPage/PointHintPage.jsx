import React from 'react'
import "./PointHintPage.scss"
const PointHintPage =({hint,time})=> {
  return (
    <div className='page_hint__point page'>
      <div className="page__title">камни бесконечности</div>
			<div className="page_content">
				<div className="page_timer">
					<div className="timer_time">{time}</div>
				</div>
				<div className="page_hint__hint page_hint__hint-point">
          <span>куда дальше?</span>
          <span>{hint}</span>

				</div>
				
			</div>

			<div className="page_empty"></div>
    </div>
  )
}

export default PointHintPage