const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  return blogs.reduce((favorite, blog) => {

    return blog.likes > favorite.likes ? blog : favorite
  })
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const blogCounts = blogs.reduce((counts, blog) => {
    counts[blog.author] = (counts[blog.author] || 0) +1
    return counts
  }, {})

  let maxWriter = null

  let maxBlogs = 0

  const writerList = blogCounts

  for (const writer in writerList) {
    if (writerList[writer] > maxBlogs) {
        maxBlogs = writerList[writer]
        maxWriter = writer
    }
  }

  return {
    author: maxWriter,
    blogs: maxBlogs
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}