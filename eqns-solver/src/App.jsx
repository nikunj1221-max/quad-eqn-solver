import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [ans, setAns] = useState(null)
  
  const [values, setValues] = useState({
    a: "",
    b: "",
    c: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const calc = (e) => {
    e.preventDefault();
     
    const a = Number(values.a);
    const b = Number(values.b);
    const c = Number(values.c);
    
    // Check for linear equation
    if(a === 0) {
      if(b === 0) {
        alert("Not a valid equation");
        return;
      }
      const x = -c / b;
      setAns({ type: "linear", x: x.toFixed(4) });
      return;
    }
    
    // Calculate discriminant
    const D = b * b - (4 * a * c);
    
    if(D < 0) {
      setAns({ type: "imaginary", message: "No real roots (imaginary roots)" });
      return;
    }
    
    if(D === 0) {
      const x = (-b) / (2 * a);
      setAns({ type: "equal", x: x.toFixed(4) });
      return;
    }
    
    if(D > 0) {
      const sqrtD = Math.sqrt(D);
      const x1 = (-b + sqrtD) / (2 * a);
      const x2 = (-b - sqrtD) / (2 * a);
      setAns({ type: "two", x1: x1.toFixed(4), x2: x2.toFixed(4) });
      return;
    }
  };

  return (
    <>
      <div className='flex justify-center items-center min-h-screen bg-gray-100'>
        <div className='w-96 bg-white rounded-lg shadow-lg p-8'>
          <h2 className='text-2xl font-bold text-center mb-2 text-gray-800'>Solve your equations with ease</h2>
          <h1 className='text-3xl font-bold text-center mb-6 text-yellow-500'>ax² + bx + c = 0</h1>
          
          <form onSubmit={calc}>
            <div className='flex flex-col gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Enter a</label>
                <input 
                  type="number" 
                  name="a"
                  placeholder='Enter a'
                  value={values.a}
                  onChange={handleChange}
                  className='w-full border border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none px-3 py-2 rounded'
                />
              </div>
              
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Enter b</label>
                <input 
                  type="number" 
                  name="b"
                  placeholder='Enter b'
                  value={values.b}
                  onChange={handleChange}
                  className='w-full border border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none px-3 py-2 rounded'
                />
              </div>
              
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Enter c</label>
                <input 
                  type="number" 
                  name="c"
                  placeholder='Enter c'
                  value={values.c}
                  onChange={handleChange}
                  className='w-full border border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none px-3 py-2 rounded'
                />
              </div>
              
              <button 
                type="submit"
                className='w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium mt-2'
              > 
                Solve 
              </button>
            </div>
          </form>
          
          {ans && (
            <div className='mt-6 p-4  border-4 border-blue-200 rounded-lg'>
              <p className='font-semibold text-gray-800 mb-2'>Solution:</p>
              {ans.type === 'two' && (
                <div className='text-teal-700'>
                  <p>x₁ = {ans.x1}</p>
                  <p>x₂ = {ans.x2}</p>
                </div>
              )}
              {ans.type === 'equal' && (
                <p className='text-green-700'>x = {ans.x} (equal roots)</p>
              )}
              {ans.type === 'linear' && (
                <p className='text-green-700'>x = {ans.x} (linear equation)</p>
              )}
              {ans.type === 'imaginary' && (
                <p className='text-orange-600'>{ans.message}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
