// import { useEffect, useState } from 'react';
// import reviews_json from '../reviews_data.json'

// // ● Positive: #D9F2DD
// // ● Negative: #F2DBD9
// // ● Mixed: #e8bd6d3d
// // ● Neutral: #eaf09b6b

// function ReviewList() {
//     const [data, setData] = useState([]);
//     const [visible, setVisible] = useState(false);

//     async function fetchData() {
//         // console.log(reviews_json);
//         // console.log(reviews_json[0].reviewer_name);
//         // console.log(reviews_json[5].content);
//         // console.log(reviews_json[0].analytics[0].sentiment);
//         setData(reviews_json);
//     }

//     useEffect(() => {
//         fetchData();
//     }, []);

//     function getClassName(array) {
//         const arr = array.map(e => e);
//         // console.log(arr);
//         if (arr[0]) {
//             // console.log(arr[0].sentiment);
//             if (arr[0].sentiment === 'Positive') {

//                 return 'Positive'
//             }
//             else if (arr[0].sentiment === 'Negative') {
//                 return 'Negative'
//             }
//             else if (arr[0].sentiment === 'Mixed') {
//                 return 'Mixed'
//             }
//             else if (arr[0].sentiment === 'Neutral') {
//                 return 'Neutral'
//             }
//         }
//         return 'None';
//     }

//     function getRating(rating) {
//         const filledStars = Math.round(rating / 2);
//         const totalStars = 5;
//         const stars = [];

//         for (let i = 0; i < totalStars; i++) {
//             if (i < filledStars) {
//                 stars.push(<span key={i} className='filled'>★</span>);
//             }
//             else {
//                 stars.push(<span key={i} className='not-filled'>☆</span>);
//             }
//         }
//         return stars;
//     }

//     function handleVisible() {
//         setVisible(true);
//     }

//     function handleInvisible() {
//         setVisible(false);
//     }

//     return (
//         <div>

//             <h1>
//                 Reviews by customers
//             </h1>
//             <div className='review-list-component'>
//                 {
//                     data ? (
//                         data.map((dt, i) => {
//                             return (
//                                 <div key={i}>

//                                     <div className='review-user-component'>

//                                         <div className='review-user'>
//                                             <span><b>{dt.reviewer_name}</b></span> wrote a review at <span><b>{dt.date}</b></span>
//                                         </div>

//                                         <div className='review-rating'>
//                                             Rating: {getRating(dt.rating_review_score)}
//                                         </div>

//                                         <div className={visible ? 'visible' : 'invisible'}>
//                                             {dt.topic}
//                                         </div>

//                                         <div className='review-comment' onMouseEnter={handleVisible} onMouseLeave={handleInvisible}>

//                                             <span className={getClassName(dt.analytics)}>
//                                                 {dt.content}
//                                             </span>

//                                         </div>

//                                     </div>

//                                 </div>
//                             )
//                         })
//                     ) : (
//                         <div>
//                             No reviews yet
//                         </div>
//                     )
//                 }
//             </div>
//         </div>
//     )
// }

// export default ReviewList;


import { useEffect, useState } from 'react';
import reviews_json from '../reviews_data.json';

function ReviewList() {
    const [data, setData] = useState([]);
    const [hoveredReview, setHoveredReview] = useState(null);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    async function fetchData() {
        setData(reviews_json);
    }

    useEffect(() => {
        fetchData();
    }, []);

    function getClassName(array) {
        const sentiment = array[0]?.sentiment || 'None';
        const className = sentiment === 'Positive' ? 'Positive'
            : sentiment === 'Negative' ? 'Negative'
                : sentiment === 'Mixed' ? 'Mixed'
                    : sentiment === 'Neutral' ? 'Neutral'
                        : 'None';
        return className;
    }

    function getRating(rating) {
        const filledStars = Math.round(rating / 2);
        const totalStars = 5;
        const stars = [];
        for (let i = 0; i < totalStars; i++) {
            stars.push(
                <span key={i} className={i < filledStars ? 'filled' : 'not-filled'}>
                    {i < filledStars ? '★' : '☆'}
                </span>
            );
        }
        return stars;
    }

    function handleMouseEnter(i, event) {
        setHoveredReview(i);
        setCursorPosition({ x: event.clientX, y: event.clientY });
    }

    function handleMouseLeave() {
        setHoveredReview(null);
    }

    function handleMouseMove(event) {
        setCursorPosition({ x: event.clientX, y: event.clientY });
    }

    return (
        <div>
            <h1>Reviews by customers</h1>
            <div className='review-list-component'>
                {data.length > 0 ? (
                    data.map((dt, i) => (
                        <div key={i} className='review-user-component'>
                            <div className='review-user'>
                                <span><b>{dt.reviewer_name}</b></span> wrote a review at <span><b>{dt.date}</b></span>
                            </div>
                            <div className='review-rating'>
                                Rating: {getRating(dt.rating_review_score)}
                            </div>
                            <div
                                className='review-comment'
                                onMouseEnter={(e) => handleMouseEnter(i, e)}
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                            >
                                <span className={getClassName(dt.analytics)}>
                                    {dt.content}
                                </span>
                                {hoveredReview === i && (
                                    <div
                                        className='visible'
                                        style={{
                                            position: 'absolute',
                                            top: cursorPosition.y,
                                            left: cursorPosition.x,
                                            transform: 'translate(-50%, -100%)',
                                            pointerEvents: 'none', // Ensure it doesn't block mouse events
                                        }}
                                    >
                                        {dt.topic}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No reviews yet</div>
                )}
            </div>
        </div>
    );
}

export default ReviewList;
