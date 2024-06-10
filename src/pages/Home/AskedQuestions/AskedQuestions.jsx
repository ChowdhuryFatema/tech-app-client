import FAQImg from '../../../assets/faq.jpg';

const AskedQuestions = () => {
    return (
        <div className="max-w-7xl mx-auto px-5 my-10 lg:my-20">
            <div>
                <h2 className="text-center text-xl md:text-3xl lg:text-4xl font-bold my-10">Frequently Asked Questions</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="col-auto lg:col-span-2">
                    <div className="join join-vertical w-full">
                        <div className="collapse collapse-arrow join-item border border-base-300">
                            <input type="radio" name="my-accordion-4" defaultChecked />
                            <div className="collapse-title text-xl font-medium">
                            What is Tech App and how does it work?
                            </div>
                            <div className="collapse-content">
                                <p>Provide a brief overview of your web tech app, highlighting its main features and functionalities. Explain how users can benefit from using it and what problems it solves.
                                </p>
                            </div>
                        </div>
                        <div className="collapse collapse-arrow join-item border border-base-300">
                            <input type="radio" name="my-accordion-4" />
                            <div className="collapse-title text-xl font-medium">
                            Is Teck App compatible with all web browsers and devices?
                            </div>
                            <div className="collapse-content">
                                <p>Clarify the compatibility of your app with different web browsers (like Chrome, Firefox, Safari, etc.) and devices (desktop, laptop, tablet, mobile). If there are any specific requirements or limitations, mention them here.
                                </p>
                            </div>
                        </div>
                        <div className="collapse collapse-arrow join-item border border-base-300">
                            <input type="radio" name="my-accordion-4" />
                            <div className="collapse-title text-xl font-medium">
                            How secure is Tech App for handling sensitive data?
                            </div>
                            <div className="collapse-content">
                                <p>Address concerns about data security and privacy. Describe the measures you have taken to protect user sensitive information, such as encryption protocols, compliance with industry standards (like GDPR or HIPAA), and any security features implemented within the app.</p>
                            </div>
                        </div>
                        <div className="collapse collapse-arrow join-item border border-base-300">
                            <input type="radio" name="my-accordion-4" />
                            <div className="collapse-title text-xl font-medium">
                            Can I integrate Tech App with other tools or platforms?
                            </div>
                            <div className="collapse-content">
                                <p>Explain the flexibility of your app in terms of integration with third-party tools, APIs, or platforms. Provide information about any existing integrations or guidelines for developers who want to integrate your app with their own systems.</p>
                            </div>
                        </div>
                        <div className="collapse collapse-arrow join-item border border-base-300">
                            <input type="radio" name="my-accordion-4" />
                            <div className="collapse-title text-xl font-medium">
                            What kind of support and updates do you offer for Tech App?
                            </div>
                            <div className="collapse-content">
                                <p>Outline the customer support channels available (such as email, live chat, or a knowledge base), along with typical response times. Additionally, mention your approach to software updates, including how often they occur and whether they include new features, bug fixes, or security patches.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-auto lg:col-span-1">
                    <img src={FAQImg} alt="" />
                </div>
            </div>
        </div>
    );
};

export default AskedQuestions;