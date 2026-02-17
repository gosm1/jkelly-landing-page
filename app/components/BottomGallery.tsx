export default function BottomGallery() {
    return (
        <div className="py-10 overflow-hidden opacity-40">
            <div className="flex gap-4 animate-[slide_30s_linear_infinite]">
                {/* Repeating images for marquee effect */}
                <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&w=400&q=80" className="h-40 w-64 object-cover rounded-lg" alt="Gallery 1" />
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&w=400&q=80" className="h-40 w-64 object-cover rounded-lg" alt="Gallery 2" />
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&w=400&q=80" className="h-40 w-64 object-cover rounded-lg" alt="Gallery 3" />
                <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&w=400&q=80" className="h-40 w-64 object-cover rounded-lg" alt="Gallery 4" />
                <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&w=400&q=80" className="h-40 w-64 object-cover rounded-lg" alt="Gallery 5" />
            </div>
        </div>
    );
}
