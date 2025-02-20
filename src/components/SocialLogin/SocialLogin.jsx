import { FaGithub, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SocialLogin = () => {
    const { googleSignIn, githubLogin } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGithubSignIn = () => {
        githubLogin()
            .then(result => {
                // console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    photo: result.user?.photoURL,
                    role: 'user'
                }
                useAxiosPublic.post('/users', userInfo)
                    .then(res => {
                        // console.log(res.data);
                        navigate('/');
                    })
                    .catch(error => {
                        console.error('Error during sign-in:', error);
                    });
            })

    }

    // const handleGoogleSignIn = () => {
    //     googleSignIn()
    //     // navigate("/");
    //         .then(result => {
    //             // console.log(result.user);
    //             const userInfo = {
    //                 email: result.user?.email,
    //                 name: result.user?.displayName,
    //                 photo: result.user?.photoURL,
    //                 role: 'user'
    //             }
    //             axiosPublic.post('/users', userInfo)
    //                 .then(res => {
    //                     // console.log(res.data);
    //                     navigate('/');
    //                 })
    //                 .catch(error => {
    //                     console.error('Error during sign-in:', error);
    //                 });
    //         })
    // }
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(async (result) => {
                if (!result.user) {
                    console.error("Google Sign-In failed");
                    return;
                }
    
                const userInfo = {
                    email: result.user.email,
                    name: result.user.displayName,
                    photo: result.user.photoURL,
                    role: "user",
                };
    
                try {
                    // Check if user already exists in the database
                    const existingUser = await axiosPublic.get(`/users/${userInfo.email}`);
    
                    if (!existingUser.data.exists) {
                        // Add new user if they don't exist
                        await axiosPublic.post("/users", userInfo);
                    }
    
                    // Navigate to home after successful sign-in
                    navigate("/");
                } catch (error) {
                    console.error("Error during sign-in:", error);
                }
            })
            .catch((error) => {
                console.error("Google Sign-In Error:", error);
            });
    };
    
    return (
        <div>
            <div className="px-8">
                <div className="divider"></div>
                <div className=" flex justify-around gap-4 mb-4">
                    <button onClick={handleGoogleSignIn} className="btn w-full">


                        <FaGoogle className="mr-4"></FaGoogle> Google
                    </button>
                    {/* <button onClick={handleGithubSignIn} className="btn w-1/2">


                        <FaGithub className="mr-4"></FaGithub> Github
                    </button> */}
                </div>
            </div>
        </div>
    );
};

export default SocialLogin;