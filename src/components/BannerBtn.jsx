import PropTypes from 'prop-types';

const BannerBtn = ({label}) => {
    return (
        <a className="relative cursor-pointer px-5 py-2 font-medium text-black group">
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-[#085f4f] group-hover:bg-[#0ae0b8] group-hover:skew-x-12"></span>
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-[#0ae0b8] group-hover:bg-[#0e977e] group-hover:-skew-x-12"></span>
            <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-[#0ae0b8] -rotate-12"></span>
            <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-[#0ae0b8] -rotate-12"></span>
            <span className="relative group-hover:text-white">{label}</span>
        </a>
    );
};

BannerBtn.propTypes = {
    label: PropTypes.string,
} 
export default BannerBtn;