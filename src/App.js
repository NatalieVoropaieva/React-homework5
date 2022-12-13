import './App.css';
import {useState} from "react";

function App() {
    const [inputs, setInputs] = useState({});
    const [currentStep, setCurrentStep] = useState(0);
    const [isClicked, setToggleValue] = useState(false);
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);
        alert('You are a new member of our family');
    }
    const handleIsClicked = () => {
        const newIsClicked = !isClicked;
        setToggleValue(newIsClicked);
    }


    const handleCurrentStep = (number) => {
        const newStep = currentStep + number;
        setCurrentStep(newStep < 0 ? 0 : newStep);
    }
    let currentStepComp = <FirstStep inputs={inputs} handleChange={handleChange}
                                     handleCurrentStep={handleCurrentStep}/>;
    if (currentStep === 1) {
        currentStepComp =
            <SecondStep inputs={inputs} handleChange={handleChange} handleCurrentStep={handleCurrentStep}/>;
    }
    if (currentStep === 2) {
        currentStepComp = <ThirdStep inputs={inputs} handleChange={handleChange} handleCurrentStep={handleCurrentStep}/>
    }
    if (currentStep === 3) {
        currentStepComp = <ForthStep inputs={inputs} handleChange={handleChange} handleCurrentStep={handleCurrentStep}/>
    }
    if (currentStep === 4) {
        currentStepComp = <FifthStep inputs={inputs} handleChange={handleChange} handleCurrentStep={handleCurrentStep}/>
    }
    const classes = `form ${isClicked ? 'dark' : 'light'}`
    return (
        <div className={classes}>
            <div className='form-container'>
                <button className='theme-btn' onClick={handleIsClicked}>
                    {isClicked ? '☾' : '☀'}
                </button>
                <form onSubmit={handleSubmit}>
                    {currentStepComp}
                </form>
            </div>

        </div>
    );
}

const FirstStep = ({handleChange, inputs, handleCurrentStep}) => {
    const isDisabled = () => {
        return !inputs.firstName || !inputs.lastName;
    }
    return (
        <div className='step-container'>
            <label>First Name:
                <input type="text" name='firstName' onChange={handleChange} value={inputs.firstName || ''} required
                       placeholder='First Name'/>
            </label>
            <label>Last Name:
                <input type="text" name='lastName' onChange={handleChange} value={inputs.lastName || ''} required
                       placeholder='Last Name'/>
            </label>
            <div className='btn-container'>
                <div></div>
                <button className='btn-primary' onClick={() => handleCurrentStep(1)} disabled={isDisabled()}>▶</button>
            </div>

        </div>
    )
}

const SecondStep = ({handleChange, inputs, handleCurrentStep}) => {
    const isDisabled = () => {
        let isValidated = false;
        if (inputs.email) {
            isValidated = String(inputs.email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        }
        if (inputs.phone) {
            isValidated = String(inputs.phone)
                .match(
                    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
                );
        }
        return !isValidated || !inputs.email || !inputs.phone;
    }

    return (
        <div className='step-container'>
            <label>E-mail:
                <input type="email" name='email' onChange={handleChange} value={inputs.email || ''} required
                       placeholder='E-mail'/>
            </label>
            <label>Phone number:
                <input type="text" name='phone' onChange={handleChange} value={inputs.phone || ''} required
                       placeholder='Phone number'/>
            </label>
            <div className='btn-container'>
                <button className='btn-secondary' onClick={() => handleCurrentStep(-1)}>◀</button>
                <button className='btn-primary' onClick={() => handleCurrentStep(1)} disabled={isDisabled()}>▶</button>
            </div>
        </div>
    )
}
const ThirdStep = ({handleChange, inputs, handleCurrentStep}) => {
    const isDisabled = () => {
        return !inputs.dateOfBirth || !inputs.sex;
    }

    return (
        <div className='step-container'>
            <label>Date of Birth:
                <input type="date" name='dateOfBirth' onChange={handleChange} value={inputs.dateOfBirth || ''}
                       required/>
            </label>
            <label>Sex:
                <select name="sex" onChange={handleChange} value={inputs.sex || ''} required>
                    <option value="">
                        Choose sex
                    </option>
                    <option value="male">
                        Male
                    </option>
                    <option value="female">
                        Female
                    </option>
                </select>

            </label>
            <div className='btn-container'>
                <button className='btn-secondary' onClick={() => handleCurrentStep(-1)}>◀</button>
                <button className='btn-primary' onClick={() => handleCurrentStep(1)} disabled={isDisabled()}>▶</button>
            </div>

        </div>
    )
}
const ForthStep = ({handleChange, inputs, handleCurrentStep}) => {
    const isDisabled = () => {
        return !inputs.state || !inputs.city || !inputs.street;
    }

    return (
        <div className='step-container'>
            <label>State:
                <input type="text" name='state' onChange={handleChange} value={inputs.state || ''} required
                       placeholder='State'/>
            </label>
            <label>City:
                <input type="text" name='city' onChange={handleChange} value={inputs.city || ''} required
                       placeholder='City'/>
            </label>
            <label>Street:
                <input type="text" name='street' onChange={handleChange} value={inputs.street || ''} required
                       placeholder='Street'/>
            </label>
            <div className='btn-container'>
                <button className='btn-secondary' onClick={() => handleCurrentStep(-1)}>◀</button>
                <button className='btn-primary' onClick={() => handleCurrentStep(1)} disabled={isDisabled()}>▶</button>
            </div>
        </div>
    )
}
const FifthStep = ({handleChange, inputs, handleCurrentStep}) => {
    const isDisabled = () => {
        return !inputs.companyName || !inputs.role;
    }

    return (
        <div className='step-container'>
            <label>Company Name:
                <input type="text" name='companyName' onChange={handleChange} value={inputs.companyName || ''}
                       required placeholder='Company Name'/>
            </label>
            <label>Your Role:
                <input type="text" name='role' onChange={handleChange} value={inputs.role || ''}
                       required placeholder='Role'/>
            </label>


            <div className='btn-container'>
                <button className='btn-secondary' onClick={() => handleCurrentStep(-1)}>◀</button>
                <button className='submit-btn' type='submit' disabled={isDisabled()}>
                    ✓️
                </button>
            </div>
        </div>
    )
}

export default App;
