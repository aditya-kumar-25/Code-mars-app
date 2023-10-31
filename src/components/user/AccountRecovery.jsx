import React from 'react'
import ResetPassword from './ResetPassword'
import AccountRecoveryEmail from './AccountRecoveryEmail'
import { useState } from 'react'

function AccountRecovery() {

    const [reset , setReset] = useState(false)

    const [formData , setFormData] = useState({
        email:'',
        password:'',
        confirmPassword:'',
        otp:'',
    })

    return (
    <div className='bg-mainBg h-[100vh] flex justify-center items-start'>
        {
            reset ? (
                <ResetPassword formData={formData} setFormData={setFormData} />
            ) : (
                <AccountRecoveryEmail formData={formData} setFormData={setFormData} setReset={setReset} />
            )
        }
    </div>
    )
}

export default AccountRecovery
