const messageModel = require('./../../dao/models/message.model')

const auxMessages = [
    {user:'user01@gmail.com', message:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis lorem at risus bibendum, non accumsan arcu fermentum. Suspendisse risus lacus, efficitur in efficitur nec, cursus ut erat.'},
    {user:'user02@gmail.com', message:'Nunc mollis luctus sapien, ac pellentesque augue tincidunt ut. Cras rutrum vulputate sapien. In suscipit ipsum nec nisi convallis, in convallis nibh lobortis.'},
    {user:'user03@gmail.com', message:'Aliquam luctus posuere finibus. Nulla vitae luctus turpis. Etiam sit amet quam vel risus viverra gravida at vitae orci. In nec iaculis arcu.'},
    {user:'user04@gmail.com', message:'Nullam sed ultricies sem. Praesent non aliquet tellus. Sed at dictum justo. '},
    {user:'user05@gmail.com', message:'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed a enim quis lectus aliquet fermentum condimentum congue sem.'},
    {user:'user06@gmail.com', message:'Integer nec tortor imperdiet, luctus turpis ac, convallis ex. Cras nec varius quam, eu eleifend urna. Sed gravida luctus pretium. '},
    {user:'user07@gmail.com', message:'In ut leo eu tortor tincidunt finibus. Maecenas et tellus massa. Vivamus lobortis lectus nec laoreet molestie. Duis luctus velit nibh, sed placerat diam ullamcorper ac. '},
    {user:'user08@gmail.com', message:'Nunc et sem id ligula placerat ultricies. Suspendisse vel sagittis diam, et lobortis turpis. Donec auctor aliquet nisl, ut convallis arcu dapibus at. Donec rhoncus imperdiet semper. Proin varius velit ac eleifend commodo. Nam sem sem, sagittis non diam at, vehicula fringilla nisi.'},
    {user:'user09@gmail.com', message:'Sed eget fermentum tellus. Vestibulum id purus at diam pellentesque sagittis eu vitae mi. Curabitur ut metus vitae eros faucibus sodales.'},
    {user:'user10@gmail.com', message:'Aliquam aliquam sollicitudin risus vitae sodales. Vivamus eleifend non sem vitae luctus. Proin molestie enim in iaculis blandit.'}
]

const getMessages = (req, res) => {
    return res.render('chat')
}

const addMessage = async msg => {
    await messageModel.create(msg)
    const msgs = await messageModel.find().lean().exec()
    return msgs
}

const getAllMessage = async () => {
    const msgs = await messageModel.find().lean().exec()
    return msgs
}

module.exports = { getMessages, addMessage, getAllMessage}