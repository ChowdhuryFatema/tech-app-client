import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { WithContext as ReactTags, KEYS, SEPARATORS } from 'react-tag-input';
import { useState } from "react";
import BannerBtn from "../../../../components/BannerBtn";


const AddProducts = () => {

    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();

    const [tags, setTags] = useState([]);
    const tag = tags.map(tag => tag.text)

    const handleAddBook = e => {
        e.preventDefault();
        const form = e.target;
        const image = form.image.value;
        const name = form.name.value;
        const description = form.description.value;
        const externalLinks = form.externalLinks.value;


        const newBook = {
            image,
            name,
            description,
            externalLinks,
            tags: tag,
            ownerName: user?.displayName,
            photo: user?.photoURL,
            email: user?.email,
            timestamp: new Date(),
            status: 'Pending'

        }
        console.log(newBook)

        axiosPublic.post('/products', newBook)
            .then(data => {
                console.log(data.data);

                if (data.data.insertedId) {
                    Swal.fire({
                        text: "Product Added Successfully!",
                        icon: "success"
                    });
                    form.reset()
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
            <div className="add-book min-h-[calc(100vh-80px)] relative">
                <div className="overlay1">
                    <div className="max-w-5xl mx-auto px-5 py-16 relative z-30">
                        <div className="mb-8">
                            <h2 className="text-red text-3xl md:text-5xl text-red font-semibold text-center">Add Product</h2>
                        </div>
                        <form onSubmit={handleAddBook} className="space-y-2 md:space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5">

                                <div className="space-y-2">
                                    <p className="text-lg">Product Name</p>
                                    <input type="text" name="name" placeholder="Product Name" className="border py-3 px-2 outline-none w-full bg-transparent rounded-md" />
                                </div>


                                <div className="space-y-2">
                                    <p className="text-lg">Product Image</p>
                                    <input type="url" name="image" placeholder="Photo URL" className="border py-3 px-2 outline-none w-full bg-transparent rounded-md" />
                                </div>
                            </div>
                            <div>
                                <div className="space-y-2">
                                    <p className="text-lg">Description</p>
                                    <textarea name="description" placeholder="Description" rows={8} className="border py-3 px-2 outline-none w-full bg-transparent rounded-md" ></textarea>
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
                            <div className="space-y-2">
                                <p className="text-lg">External Links</p>
                                <input type="text" name="externalLinks" placeholder="External Links" className="border py-3 px-2 outline-none w-full bg-transparent rounded-md" />
                            </div>

                            <div className="pt-5">
                                <button type="submit">
                                    <BannerBtn label="Add Product"></BannerBtn>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </>
    );
};

export default AddProducts;