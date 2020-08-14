import React, {useState} from 'react'
import shortid from 'shortid'

const App = () => {

	//Estados
	const [tarea, setTarea] = useState('')
	const [tareas, setTareas] = useState([])
	const [modoEdicion, setModoEdicion] =useState(false) 
	const [id, setId] = useState('')
	const [error, setError] = useState(null)

	//Funciones
	const getTarea = (e) => {
		setTarea(e.target.value)
	}
	const agregarTarea = e => {
		e.preventDefault()
		if(!tarea.trim()){
			setError('Escribe algo por favor')
			return
		}
		else{
			setTareas([
				...tareas,
				{
					id: shortid.generate(),
					tarea
				}
			])
			setTarea('')
			setError(null)
		}
	}
	const deleteTask = (id) => {
		const arrayFiltrado = tareas.filter(item => item.id !==id )
		setTareas(arrayFiltrado)
	}
	const editar = (item) => {
		setModoEdicion(true)
		setTarea(item.tarea)
		setId(item.id)
	}
	const editarTarea = (e) => {
		e.preventDefault()
		if(!tarea.trim()){
			setError('Escribe algo por favor')
			return
		}
		else{
			const arrayEditado = tareas.map(
				item =>  item.id === id ? {id, tarea} : item
			)
			setTareas(arrayEditado)
			setModoEdicion(false)
			setTarea('')
			setId('')
			setError(null)
		}
	}


	return (
		<div className='container mt-3'>
			<h1 className='text-center'>CRUD</h1>
			<hr/>

			<div className="row">
				<div className="col-8">
					<h4 className="text-center">Lista de tareas</h4>
					<ul className="list-group">
						{
							tareas.length === 0 ? (
								<li className='list-group-item'>No hay tareas</li>
							) :(
								tareas.map( item => (
									<li className="list-group-item" key={item.id}>
										<span className="lead"> { item.tarea } </span>
										<button 
											className='btn btn-sm btn-danger float-right mx-2'
											onClick={ ()=> deleteTask(item.id) }
										>
											Eliminar
										</button>
										<button 
											className="btn btn-sm btn-warning float-right"
											onClick = { () => editar(item)}
										>
											Editar
										</button>
									</li>
									)
								)
							)
						}
					</ul>
				</div>
				<div className="col-3">
					<h2 className="text-center"> { modoEdicion ? 'Editar tarea': 'Agregar tarea' } </h2>
					<form onSubmit={ modoEdicion ? editarTarea : agregarTarea  }>
						{error ? <span className='text-danger'>{error}</span>: null }
						<input 
							type="text"
							className='form-control mb-2'
							placeholder='ingrese tarea'
							onChange={getTarea}
							value={tarea}
						/>
						{
							modoEdicion
							? <button className="btn btn-warning btn-block" type='submit'>Editar</button>
							: <button className="btn btn-dark btn-block" type='submit'>Agregar</button>
						}
					</form>
				</div>
			</div>

		</div>
	)
}

export default App
