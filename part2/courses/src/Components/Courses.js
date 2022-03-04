import Course from './Course'

const Courses = ({courses}) => {
    console.log(courses)
	return (
        <> 
            {<Course course={courses[0]} />}
            {<Course course={courses[1]} />}
            {courses.map(c => {<Course key={c.id} course={c} />})}
        </>
    )
}

export default Courses