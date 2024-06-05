import BannerBtn from "../../../../components/BannerBtn";
import { WithContext as ReactTags, KEYS, SEPARATORS } from 'react-tag-input';
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { useLoaderData } from "react-router-dom";

const Update = () => {
    const myProducts = useLoaderData();
    console.log(myProducts);
    const { _id, name, image, description, tags: allTag, externalLink } = myProducts;
    console.log(allTag);

    const axiosPublic = useAxiosPublic();
    const [tags, setTags] = useState([]);
    const tag = tags.map(tag => tag.text)

   
    const handleUpdateBook = e => {
        e.preventDefault();
        const form = e.target;
        const image = form.image.value;
        const name = form.name.value;
        const description = form.description.value;
        const externalLink = form.externalLink.value;


        const updatedProduct = {
            image,
            name,
            description,
            externalLink,
            tags: tag

        }
        console.log(updatedProduct)

        axiosPublic.put(`/product/${_id}`, updatedProduct)
       
            .then(data => {
                console.log(data.data);

                if (data.data.insertedId) {
                    Swal.fire({
                        text: "Product Updated Successfully!",
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
                <title>Tech Apps | Update Product</title>
            </Helmet>
            <div className="add-book min-h-[calc(100vh-80px)] relative">
                <div className="overlay1">
                    <div className="max-w-5xl mx-auto px-5 py-16 relative z-30">
                        <div className="mb-8">
                            <h2 className="text-red text-3xl md:text-5xl text-red font-semibold text-center">Update Product</h2>
                        </div>
                        <form onSubmit={handleUpdateBook} className="space-y-2 md:space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5">

                                <div className="space-y-2">
                                    <p className="text-lg">Product Name</p>
                                    <input type="text" defaultValue={name} name="name" placeholder="Product Name" className="border py-3 px-2 outline-none w-full bg-transparent rounded-md" />
                                </div>


                                <div className="space-y-2">
                                    <p className="text-lg">Product Image</p>
                                    <input type="url" defaultValue={image} name="image" placeholder="Photo URL" className="border py-3 px-2 outline-none w-full bg-transparent rounded-md" />
                                </div>
                            </div>
                            <div>
                                <div className="space-y-2">
                                    <p className="text-lg">Description</p>
                                    <textarea name="description" defaultValue={description} placeholder="Description" rows={8} className="border py-3 px-2 outline-none w-full bg-transparent rounded-md" ></textarea>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-lg">Tags</p>
                                {/* <div className="ReactTags__selected">
                                    <ul>
                                        {allTag.map((tag, idx) => <span key={idx} className="tag-wrapper ReactTags__tag" data-testid="tag" draggable="true" style={{'opacity': 1, 'cursor': 'move'}}>asdf<button data-testid="remove" className="ReactTags__remove" type="button" aria-label="Tag at index 0 with value asdf focussed. Press backspace to remove"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="12" width="12" fill="#fff"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"></path></svg></button></span>)}
                                    </ul>
                                </div> */}

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
                                <input defaultValue={externalLink} type="text" name="externalLink" placeholder="External Links" className="border py-3 px-2 outline-none w-full bg-transparent rounded-md" />
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

export default Update;