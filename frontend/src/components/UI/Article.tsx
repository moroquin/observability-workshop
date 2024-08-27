import React from 'react'
import classes from './Article.module.css'
import { iArticle } from '../../interfaces/UI/Article.interface'
//import { ArticleMain } from './styles'

export const Article = (props:iArticle) => {
  return (
    <article className={`${classes.main} ${props.className? props.className:''}`}     >
        {props.children}
    </article>
  )
}