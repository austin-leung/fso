const Total = ({parts}) => (
    <p>Number of exercises {parts.reduce((partialSum, a) => partialSum + a.exercises, 0)}</p>
)
    
export default Total