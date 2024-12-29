import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import * as Yup from 'yup';
import { fullname } from "../../ValidationScehma";
import { useState } from "react";

const Register = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const validationSchema = Yup.object().shape({
        fullname: fullname,
        email:Yup.string().email('Email is invalid').required("Email is required"),
        phone: Yup.string().matches(/^[0-9]{10}$/).required('Phone Is required'),
        password:Yup.string().min(6, "password must be atleast 6 characters").required('password is Required'),
        confirmPassword:Yup.string().oneOf([Yup.ref("password"), null], 'password Must Match').required("COnfirm password is required"),
        imageupload: Yup.mixed().required('Required')
    })

    const formik = useFormik({
        initialValues: {
            fullname: '',
            email: "",
            phone: "",
            password: "",
            confirmPassword: '',
            imageupload: ''
        },
        validationSchema,
        onSubmit: (values) => (
            console.log(values)
        )
    })

    const imageUploadChange = (e) => {
        const files = e.target.files[0];
        if(files){
            const fileUrl = URL.createObjectURL(files);
            setImagePreview(fileUrl)
        }
    }
    return (
        <div>

            <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Your Name" name="fullname" values={formik.values.fullname} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.fullname ? <span className="text-danger">{formik.errors.fullname}</span> : <></>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Enter Your Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter Your Email" name="email" value={formik.values.email} onChange={formik.handleChange} />
                    {formik.errors.email && <span className="text-danger">{formik.errors.email}</span>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Enter Your Phone Number</Form.Label>
                    <Form.Control type="phone" placeholder="Enter Your Phone Number" name="phone" value={formik.values.phone} onChange={formik.handleChange} />
                    {formik.errors.phone && <span className="text-danger">{formik.errors.phone}</span>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Enter Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" name="password" value={formik.values.password} onChange={formik.handleChange} />
                    {formik.errors.password && <span>{formik.errors.password}</span>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" name="confirmPassword" value={formik.values.confirmPassword} onChange={formik.handleChange} />
                    {formik.errors.confirmPassword && <span>{formik.errors.confirmPassword}</span>}
                </Form.Group>

                <label className="form-label">Upload Image</label>
                <div>
                <input type="file" name="imageupload" value={formik.values.imageupload} onChange={imageUploadChange} />
                <img src={imagePreview} />
                <button type="button" className="" onClick={() => setImagePreview('')}>Remove</button>
                {formik.errors.imageupload && <span>{formik.errors.imageupload}</span>}
                </div>
               
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default Register;
