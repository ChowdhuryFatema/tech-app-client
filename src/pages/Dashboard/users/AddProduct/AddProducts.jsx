import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAuth from "../../../../Hooks/useAuth";
import { WithContext as ReactTags, KEYS, SEPARATORS } from 'react-tag-input';
import { useState } from "react";
import { useForm } from "react-hook-form"
import BannerBtn from "../../../../components/BannerBtn";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";



const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const AddProducts = () => {

    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, formState: { errors }, reset } = useForm()


    const [tags, setTags] = useState([]);
    const tag = tags.map(tag => tag.text)

    const onSubmit = (data) => {

        const image = data.image;
        const name = data.name;
        const description = data.description;
        const externalLink = data.externalLink;

        console.log(image);

        const imageFile = { image: image[0] }
        axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(data => {
                console.log(data.data);
                if (data.data.success) {
                    const newProduct = {
                        name,
                        description,
                        externalLink,
                        tags: tag,
                        ownerName: user?.displayName,
                        photo: user?.photoURL,
                        email: user?.email,
                        timestamp: new Date(),
                        status: 'Pending',
                        upvotes: 0,
                        image: data.data.data.display_url,

                    }
                    console.log(newProduct)

                    axiosPublic.post('/products', newProduct)
                        .then(data => {
                            console.log(data.data);

                            if (data.data.insertedId) {
                                Swal.fire({
                                    text: "Product Added Successfully!",
                                    icon: "success"
                                });
                                reset()
                            }
                        })
                }
            })
    }

    const handleDelete = (index) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    const onTagUpdate = (index, newTag) => {
        const updatedTags = [...tags];
        updatedTags.splice(index, 1, newTag);
        setTags(updatedTags);
    };

    const handleAddition = (tag) => {
        setTags((prevTags) => {
            return [...prevTags, tag];
        });
    };

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        setTags(newTags);
    };

    const handleTagClick = (index) => {
        console.log('The tag at index ' + index + ' was clicked');
    };

    const onClearAll = () => {
        setTags([]);
    };


    return (
        <>
            <Helmet>
                <title>Tech Apps | Add Product</title>
            </Helmet>
            <div>
                <div className="mx-auto px-10 py-16">
                    <div className="mb-8">
                        <h2 className="text-red text-3xl md:text-5xl text-red font-semibold text-center">Add Product</h2>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 md:space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5">

                            <div className="space-y-2">
                                <p className="text-lg">Product Name</p>
                                <input type="text"  {...register("name", { required: true })} placeholder="Product Name" className="border py-3 px-2 outline-none w-full bg-transparent rounded-md" />
                                {errors.name && <span className="text-red-500">Product Name is required</span>}
                            </div>
                            <div className="space-y-2">
                                <p className="text-lg">External Links</p>
                                <input type="text" {...register("externalLink", { required: true })} placeholder="External Links" className="border py-3 px-2 outline-none w-full bg-transparent rounded-md" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p className="text-lg">Tags</p>
                            <ReactTags
                                classNames="w-full p-10"
                                tags={tags}
                                delimiters={[KEYS.TAB, KEYS.SPACE, KEYS.COMMA]}
                                separators={[SEPARATORS.ENTER, SEPARATORS.COMMA]}
                                handleDelete={handleDelete}
                                handleAddition={handleAddition}
                                handleDrag={handleDrag}
                                handleTagClick={handleTagClick}
                                onTagUpdate={onTagUpdate}
                                onClearAll={onClearAll}
                                inputFieldPosition="bottom"
                                editable
                                clearAll
                                maxTags={7}
                            />
                        </div>
                        <div>
                            <div className="space-y-2">
                                <p className="text-lg">Description</p>
                                <textarea {...register("description")} placeholder="Description" rows={8} className="border py-3 px-2 outline-none w-full bg-transparent rounded-md" ></textarea>
                            </div>
                        </div>



                        <div className="flex flex-col md:flex-row justify-between mt-5 md:items-center gap-5">
                            <div>
                                <input
                                    {...register("image", { required: true })}
                                    type="file" className="file-input w-full max-w-xs" /><br />
                                {errors.image && <span className="text-red-500">
                                    Image is required</span>}
                            </div>

                            <div>
                                <button type="submit">
                                    <BannerBtn label="Add Product"></BannerBtn>
                                </button>
                            </div>
                        </div>



                    </form>
                </div>
            </div>

        </>
    );
};

export default AddProducts;