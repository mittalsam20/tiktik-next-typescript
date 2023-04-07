export default {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    {
      name: 'postId',
      title: 'Post Id',
      type: 'string',
    },
    {
      name: 'parentId',
      title: 'Parent Id',
      type: 'string',
    },
    {
      name: 'postedBy',
      title: 'Posted By',
      type: 'postedBy',
    },
    {
      name: 'comment',
      title: 'Comment',
      type: 'string',
    },
  ],
}
