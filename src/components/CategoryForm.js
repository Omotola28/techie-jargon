import React, {useEffect, useState } from 'react'

function CategoryForm(props) {

    const [categories, setCategories] = useState([]);

    const {handleSubmit, categoryEl, searchEl, onChangeHandler} = props;

    const categoryObjectData = [
        {
            id: 0,
            name: 'Category',
        },
        {
          id: 1,
          name: 'Tech Roles',
        },
        {
          id: 2,
          name: 'Programming Concepts',
        },
        {
          id: 3,
          name: 'Version control',
        },
        {
          id: 4,
          name: 'Programming Lingo',
        },
        {
            id: 5,
            name: 'Tools & Services',
        },
        {
            id: 6,
            name: 'Web Related',
        },
    ];


    useEffect(() => {
        setCategories(categoryObjectData);
    }, [])


    return (
        <div>
            <form className="form-header" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="category"></label>
                    <select id="category" ref={categoryEl}>
                        {categories.map(category => {
                            return <option 
                                        value={category.name}
                                        key={category.id}>{category.name}
                                    </option>
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="search"></label>
                        <input 
                            onChange={onChangeHandler}
                            type="text" id="searchBox" 
                            placeholder="Search Techie Word"
                            ref={searchEl}
                            required
                        />
                </div>
            </form>
        </div>
    )
}

export default CategoryForm
