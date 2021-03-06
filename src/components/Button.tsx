import * as React from 'react'
import styled from '@emotion/styled'

import { getEmSize } from '../styles/mixins'
import { colors } from '../styles/variables'
import { Link, StaticQuery, graphql } from 'gatsby'

const StyledButton = styled.div`
  font-size: ${getEmSize(20)}em;
  display: inline-flex;
  cursor: pointer;
  border-radius: 1000px;
  border-color: ${colors.gray.copy};
  background-color: ${colors.white};
  box-shadow: 0 ${getEmSize(5)}em ${getEmSize(15)}em ${getEmSize(3)}em ${colors.gray.copy};

  &:hover {
    background-color: ${colors.lilac};
    box-shadow: 0 ${getEmSize(10)}em ${getEmSize(10)}em ${getEmSize(5)}em ${colors.gray.copy};
    a {
      color: white;
    }
  }

  &:active {
    box-shadow: none;
    background-color: ${colors.lilac};
    a {
      color: white;
    }
  }

  a {
    display: flex;
    padding: ${getEmSize(6)}em;
    color: ${colors.brand};
    font-weight: 600;
    text-decoration: none !important;
    outline: 0;
  }
`

const ImgWrapper = styled.div`
  width: ${getEmSize(36)}rem;
  height: ${getEmSize(36)}rem;

  img {
    width: auto;
    height: 100%;
  }
`

const Label = styled.div`
  height: ${getEmSize(36)}rem;
  line-height: ${getEmSize(36)}rem;
  padding: 0 ${getEmSize(4)}rem;
`

interface ButtonProps {
  to: string
  img?: string
}

type StaticQueryProps = {
  allFile: {
    edges: {
      node: {
        absolutePath: string
        relativePath: string
      }
    }[]
  }
}

const getContent = (children: React.ReactNode, img?: string) => (
  <>
    {img && (
      <ImgWrapper>
        <img src={img} />
      </ImgWrapper>
    )}
    <Label>{children}</Label>
  </>
)
const Button: React.SFC<ButtonProps> = ({ to, img, children }) => (
  <StaticQuery
    query={graphql`
      query ButtonQuery {
        allFile(
          filter: { sourceInstanceName: { eq: "images" }, relativePath: { eq: "net64.svg" } }
          sort: { fields: [birthTime], order: DESC }
        ) {
          edges {
            node {
              absolutePath
              relativePath
            }
          }
        }
      }
    `}
    render={(data: StaticQueryProps) => {
      const image = img ? require(`../images/${data.allFile.edges[0].node.relativePath}`) : undefined
      return (
        <StyledButton>
          {to.includes('//') ? (
            <a href={to} target="_blank" rel="noopener norefferer">
              {getContent(children, image)}
            </a>
          ) : (
            <Link to={to}>{getContent(children, image)}</Link>
          )}
        </StyledButton>
      )
    }}
  />
)

export default Button
