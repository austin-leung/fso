const Filter = ({searchVal, setSearchVal}) => {
    return (
      <span>filter shown with 
        <input 
          value={searchVal}
          onChange={(val) => setSearchVal(val.target.value.toLowerCase())}
        />
      </span>
    )
  }

export default Filter